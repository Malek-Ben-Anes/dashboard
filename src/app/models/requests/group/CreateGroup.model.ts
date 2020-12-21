import {Gender} from '@app/models/enums/Gender';
import {Level} from '@app/models/enums/Level';

export class CreateGroupRequest {
    name: string;
    level: Level;
    description: string;
    timeTableUrl: string;
}
