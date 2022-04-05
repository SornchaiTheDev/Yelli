function Save() {
  return (
    <div className="fixed bottom-0 bg-white flex space-x-2 w-full px-4 py-4">
      <div className="bg-yellow-500 rounded-lg flex justify-center px-4 py-2 cursor-pointer">
        <h1 className="text-md font-medium">Save Changes</h1>
      </div>
      <div className="bg-gray-300 rounded-lg flex justify-center px-4 py-2 cursor-pointer">
        <h1 className="text-md font-medium">Cancel</h1>
      </div>
    </div>
  );
}

export default Save;
