import React from 'react';

const HabitTracker = () => {
  // 임시 데이터
  const habits = [
    { name: '운동하기', progress: 75 },
    { name: '물 8잔 마시기', progress: 50 },
    { name: '코딩 공부하기', progress: 90 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">This Week</h2>
      <div className="space-y-4">
        {habits.map((habit, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-pastel-green-dark">{habit.name}</span>
              <span className="text-sm font-medium text-pastel-green-dark">{habit.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-black h-2.5 rounded-full"
                style={{ width: `${habit.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;