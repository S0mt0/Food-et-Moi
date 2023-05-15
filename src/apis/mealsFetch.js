import axios from "axios";

const meals = axios.create({
  baseURL: "http://www.themealdb.com/api/json/v1/1",
});
