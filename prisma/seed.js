const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo tipos sanguíneos...');

  await prisma.bloodType.createMany({
    data: [
      { id: 1, blood_type: 'A+' },
      { id: 2, blood_type: 'A-' },
      { id: 3, blood_type: 'B+' },
      { id: 4, blood_type: 'B-' },
      { id: 5, blood_type: 'AB+' },
      { id: 6, blood_type: 'AB-' },
      { id: 7, blood_type: 'O+' },
      { id: 8, blood_type: 'O-' }
    ],
    skipDuplicates: true
  });

  console.log('Inserindo hemocentros...');

  await prisma.hemocentro.createMany({
    data: [
      {
        id: 1,
        nome: 'Hemocentro HSP Unifesp',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'R. Dr. Diogo de Faria, 824',
        horario_funcionamento: '8h às 17h',
        latitude: -23.595395,
        longitude: -46.644813
      },
      {
        id: 2,
        nome: 'Hospital Paulistano',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'R. Martiniano de Carvalho, 741',
        horario_funcionamento: '8h às 17h',
        latitude: -23.564944,
        longitude: -46.642303
      },
      {
        id: 3,
        nome: 'Hospital Heliópolis',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'R. Cônego Xavier, 276',
        horario_funcionamento: '8h às 17h',
        latitude: -23.606425,
        longitude: -46.594687
      },
      {
        id: 4,
        nome: 'Hospital Cantareira',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'Av. Nova Cantareira, 3050',
        horario_funcionamento: '8h às 17h',
        latitude: -23.471742,
        longitude: -46.615519
      },
      {
        id: 5,
        nome: 'Hospital Santa Ana',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'R. Cavalheiro Ernesto Giuliano, 979',
        horario_funcionamento: '8h às 17h',
        latitude: -23.634712,
        longitude: -46.562378
      },
      {
        id: 6,
        nome: 'Hospital São Camilo - Unidade Pompeia',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'Av. Pompéia, 1178',
        horario_funcionamento: '8h às 17h',
        latitude: -23.533047,
        longitude: -46.688353
      },
      {
        id: 7,
        nome: 'Hospital São Paulo',
        cidade: 'São Paulo',
        estado: 'São Paulo',
        endereco: 'R. Napoleão de Barros, 715',
        horario_funcionamento: '8h às 17h',
        latitude: -23.597523,
        longitude: -46.643578
      }
    ],
    skipDuplicates: true
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });