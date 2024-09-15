import { Schema, model, Document } from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser extends Document {
	username: string
	email: string
	password: string
	comparePassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
}, {
	timestamps: true
})

userSchema.pre('save', async function (next) {
	const user = this
	if (!user.isModified('password')) return next()
	const salt = await bcryptjs.genSalt(10)
	user.password = await bcryptjs.hash(user.password, salt)
	next()
})

userSchema.methods['comparePassword'] = async function (candidatePassword: string) {
	const user = this
	return bcryptjs.compare(candidatePassword, user['password'])
}

export default model<IUser>('User', userSchema)
