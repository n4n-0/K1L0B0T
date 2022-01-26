import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user_stats" })
export class UserStats {
    @PrimaryColumn({ name: "user_id" })
    userId: string;

    @Column({ name: "user_name" })
    userName: string;

    @Column({ name: "guild_id" })
    guildId: string;

    @Column({ name: "points" })
    points: number;

    @Column({ name: "user_level" })
    level: number;

    @Column({ name: "xp" })
    xp: number;

    @Column({ name: "bans" })
    bans: number;

    @Column({ name: "users_banned" })
    usersBanned: number;

    @Column({ name: "kicks" })
    kicks: number;

    @Column({ name: "users_kicked" })
    usersKicked: number;

    @Column({ name: "mutes" })
    mutes: number;

    @Column({ name: "users_muted" })
    usersMuted: number;

    @Column({ name: "warnings" })
    warnings: number;

    @Column({ name: "users_warned" })
    warningsGiven: number;

    


}