import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IValoration {
    name: string;
    mark: number;
    user: string;
    participation: boolean;
}

export interface IValorationModel extends IValoration, Document {}

const ValorationSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        mark: { type: Number, required: true },
        user: { type: [Schema.Types.ObjectId], required: false, ref: 'user' },
        participation: { type: Boolean, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IValorationModel>('valoration', ValorationSchema);
