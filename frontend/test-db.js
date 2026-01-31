
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://skillbridge:skillbridge123@127.0.0.1:5433/skillbridge"
        }
    }
});

async function main() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');
        const users = await prisma.user.findMany();
        console.log('Query successful, users found:', users.length);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
