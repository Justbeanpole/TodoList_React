import {superbase} from '../../lib/superbase.js';


const period = (date) => {
    let startDay = new Date();
    startDay.setHours(0, 0, 0, 0)
    let endDay = new Date(startDay);
    endDay.setHours(23, 59, 59, 999)
    if (date && date.type === 'month') {
        startDay.setDate(1);
        endDay = new Date(startDay.getFullYear(), startDay.getMonth() + 1, 0);
    }
    return [startDay.toISOString(), endDay.toISOString()];
}

export const getTodos = async (params = {}) => {
    const [start, end] = period(params.date);
    let query = superbase.from('todos').select('*').gte('date', start).lt('date', end);
    if (params.done) query = query.eq('done', params.done);
    if (params.isNull?.includes("priority")) query = query.is('priority', null);
    if (params.isNotNull?.includes("priority")) query = query.not('priority', "is", null);
    if (params.isNull?.includes("scheduleTime")) query = query.is('schedule_time', null);
    if (params.isNotNull?.includes("scheduleTime")) query = query.not('schedule_time', "is", null);
    if (params.orderBy) query = query.order(params.orderBy);
    const {data, error} = await query;
    if (error) throw error;
    return data;
}