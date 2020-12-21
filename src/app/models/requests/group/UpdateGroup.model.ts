
import {Level} from '@app/models/enums/Level';

export class UpdateGroupRequest {
    id: string;
    name: string;
    level: Level;
    description: string;
    timeTableUrl: string;
}
