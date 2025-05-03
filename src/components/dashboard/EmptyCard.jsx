export const EmptyCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[380px] space-y-4 dark:bg-gray-900">
    <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 text-center">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[300px]">
      {description}
    </p>
  </div>
);