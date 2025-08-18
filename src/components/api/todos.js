import {superbase} from '../../lib/superbase.js';

const period = () => {
    let startDay = new Date();
    startDay.setHours(0, 0, 0, 0)
    let endDay = new Date(startDay);
    endDay.setHours(23, 59, 59, 999)
    return [startDay.toISOString(), endDay.toISOString()];
}

export const getTodos = async () => {
    const [start, end] = period();
    let query = superbase.from('todos').select('*').gte('date', start).lt('date', end)
        .order("done", {ascending: true}).order('list_order');
    const {data, error} = await query;
    if (error) throw error;
    return data;
}