import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcryptjs';

// import { membersData } from './membersData.ts';
import { membersWithProfileFields } from './membersData.ts';

const prisma = new PrismaClient();

// 開発用データを最初から作り直したいとき
// async function seedMembers() {
// 	return membersData.map(async (member) =>
// 		prisma.user.create({
// 			data: {
// 				email: member.email,
// 				emailVerified: new Date(),
// 				name: member.name,
// 				passwordHash: await hash('password', 10),
// 				image: member.image,
// 				member: {
// 					create: {
// 						dateOfBirth: new Date(member.dateOfBirth),
// 						gender: member.gender,
// 						searchGender: member.searchGender,
// 						name: member.name,
// 						created: new Date(member.created),
// 						updated: new Date(member.lastActive),
// 						description: member.description,
// 						city: member.city,
// 						country: member.country,
// 						image: member.image,
// 						photos: {
// 							create: member.photos.map((photo) => ({
// 								url: photo.url,
// 								publicId: photo.publicId,
// 							})),
// 						},
// 					},
// 				},
// 			},
// 		}),
// 	);
// }

// Update country names for existing seeded members.
// async function updateSeededCountries() {
// 	await Promise.all(
// 		membersData.map((member) =>
// 			prisma.member.updateMany({
// 				where: {
// 					user: {
// 						email: member.email,
// 					},
// 				},
// 				data: {
// 					country: member.country,
// 				},
// 			}),
// 		),
// 	);
// }

async function updateSeededProfileFields() {
	await Promise.all(
		membersWithProfileFields.map((member) =>
			prisma.member.updateMany({
				where: {
					user: {
						email: member.email,
					},
				},
				data: {
					height: member.height,
					languages: member.languages,
					relationshipGoals: member.relationshipGoals,
					interests: member.interests,
					hasKids: member.hasKids,
					wantsKids: member.wantsKids,
					maritalStatus: member.maritalStatus,
				},
			}),
		),
	);
}

async function main() {
	await updateSeededProfileFields();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
