import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RevenueCycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  payer: string;

  @Column()
  procedureCode: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'enum', enum: ['PRE_AUTH', 'ATTENDANCE', 'BILLING', 'ADJUDICATION', 'PAYMENT'] })
  stage: 'PRE_AUTH' | 'ATTENDANCE' | 'BILLING' | 'ADJUDICATION' | 'PAYMENT';

  @Column({ type: 'enum', enum: ['OPEN', 'DENIED', 'APPROVED', 'PAID', 'CANCELLED'] })
  claimStatus: 'OPEN' | 'DENIED' | 'APPROVED' | 'PAID' | 'CANCELLED';

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  paidDate?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
