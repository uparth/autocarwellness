import prisma from '../config/db.js';

async function main() {
  console.log('Seeding initial data...');

  await prisma.dealer.create({
    data: {
      dealerName: 'AutoWellness Dealer',
      dealerAddressLine1: '123 Main Street',
      dealerAddressLine2: 'Suite 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  });

  console.log('Seed complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
