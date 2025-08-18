const DateHeader = () => {
    const today = new Date();
    const day = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
    return (
        <header className="mb-4 text-center">
            <h1 className="text-3xl font-medium p-5 text-gray-800">{`오늘은 ${today.getMonth()+1}월 ${today.getDate()}일 ${day[today.getDay()-1]}입니다`}</h1>
        </header>
    )
}

export default DateHeader;