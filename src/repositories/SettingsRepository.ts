import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {

}

