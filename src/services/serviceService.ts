import axios from "./api/index";
import { Entity } from "../entities/Entity";

export default class ServiceService {
  async GetEntities(): Promise<Entity[]> {
    const res = await axios.get(`url`, {
      headers: {
        "Content-Type": "application/json",
        "X-Country-Id": "TR",
        "X-Language-Id": "TR",
      },
    });
    return res.data;
  }
  async GetEntity(id: any): Promise<Entity> {
    const res = await axios.get(`url=${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Country-Id": "TR",
        "X-Language-Id": "TR",
      },
    });
    return res.data;
  }
}
