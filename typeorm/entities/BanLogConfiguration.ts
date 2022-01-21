import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ban_log_configuration" })
export class BanLogConfiguration {
    @PrimaryColumn({ name: "log_id" })
    logId: number;

    @Column({ name: "guild_id" })
    guildId: string;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "ban_reason" })
    banReason: string;
}