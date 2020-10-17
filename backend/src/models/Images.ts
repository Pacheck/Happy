import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orfanato from './Orfanatos';

@Entity('images')

export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orfanato, orfanato => orfanato.images)
    @JoinColumn({ name: 'orfanato_id'})
    orfanato: Orfanato

}