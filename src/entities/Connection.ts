import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("connections")
export class Connection {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;
    
    @JoinColumn({ name: "user_id"})
    @OneToOne(() => User)
    user: User;
    
    @Column()
    user_id: string;
    
    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}