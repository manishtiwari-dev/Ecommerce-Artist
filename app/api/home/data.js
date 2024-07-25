// pages/api/data.js
import { HomeUrl } from "../../../config";

export default async function handler(req, res) {
    try {
      const response = await fetch(`${HomeUrl}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  

 