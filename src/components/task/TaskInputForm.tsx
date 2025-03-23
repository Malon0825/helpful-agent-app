import React, { useState } from 'react';
import axios from 'axios';

function InputForm() {
  const [formData, setFormData] = useState({
    prompt: '',
    assignee: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://your-backend-url.com/api/endpoint', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
            Prompt
          </label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
            Assignee
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the assignee"
            value={formData.assignee}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
