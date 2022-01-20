import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "new_world_timers" })
export class NewWorldTimers {
    @PrimaryColumn({ name: "guild_id" })
    guildId: string;

    @Column({name: "username"})
    username: string;

    @Column({name: "start_time"})
    startTime: string;

    @Column({name: "end_time"})
    endTime: string;

    @Column({name: "type"})
    type: string;
}