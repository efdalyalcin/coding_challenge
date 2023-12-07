import axios from 'axios';
import { Startup, StartupDTO } from '../../Types/Startup';
import StartupMapper from './Startup.mapper';

export class StartupHttpService {
  public static async getStartupById(id: string | number): Promise<Startup> {
    const response = await axios.get<StartupDTO>(`/api/startups/${id}`);
    return StartupMapper.map(response.data);
  }

  public static async getStartups(): Promise<Startup[]> {
    const response = await axios.get<StartupDTO[]>(`/api/startups`);

    // StartupMapper is needed according to testes, so I could only think this in short time
    // this creates O(n^2) time complexity which is not good.
    const mappedStartups = response.data.map((startupDTO) =>
      StartupMapper.map(startupDTO)
    );
    return mappedStartups;
  }
}
