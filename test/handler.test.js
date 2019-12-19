'use strict';
const handler = require('../src/v1/handler');

const FACTIONS = ['Terran', 'Zerg', 'Protoss', 'Hybrid'];

const UNITS = [
  'Banshee',
  'Battlecruiser',
  'Cyclone',
  'Ghost',
  'Hellbat',
  'Hellion',
  'Liberator',
  'Marauder',
  'Marine',
  'Medivac',
  'Raven',
  'Reaper',
  'SCV',
  'Siege Tank',
  'Thor',
  'Viking',
  'Assault Galleon',
  'Diamondback',
  'Dominion Trooper',
  'Firebat',
  'Goliath',
  'Hercules',
  'Imperial witness',
  'Medic',
  'Science Vessel',
  'Spectre',
  'Terra-Tron',
  'Vulture',
  'Warhound',
  'Wraith',
  'Tauren Marine',
  'Scientist',
  'HERC',
  'Trooper',
  'Egon Stetmann',
  'Nova',
  'Jim Raynor',
  'Rory Swann',
  'Tychus Findlay',
  'Gabriel Tosh',
  'Matt Horner',
  'Changeling Marine',
  'Changeling Zealot',
  'Infested Terran',
  'Neural Parasite',
  'Alexei Stukov',
  'Dehaka',
  'Gary',
  'Niadra',
  'Sarah Kerrigan',
  'Zagara',
  'Adept',
  'Archon',
  'Carrier',
  'Dark Templar',
  'Disruptor',
  'High Templar',
  'Immortal',
  'Mothership',
  'Phoenix',
  'Stalker',
  'Void Ray',
  'Oracle',
  'Tempest',
  'Zealot',
  'Annihilator',
  'Arbiter',
  'Ascendant',
  'Avenger',
  'Blood hunter',
  'Centurion',
  'Corsair',
  'Dark archon',
  'Destroyer',
  'Dragoon',
  'Mirage',
  'Purifier Tempest',
  'Scout',
  'Sentinel',
  'Stone zealot',
  'Supplicant',
  "Tal'darim Mothership",
  'Vanguard',
  'Alarak',
  'Artanis',
  'Karax',
  'Karass',
  'Mohandar',
  'Selendis',
  'Urun',
  'Talandar',
  'Vorazun',
  'Zeratul',
  'Maar'
];

const ACTIONS = [
  'Trained',
  'Attacked',
  'Selected',
  'Move',
  'Attack',
  'Confirming',
  'Pissed',
  'Other'
];

test('Ensure quotes returns 200 with all quotes', async () => {
  let response = await handler.quotes({});
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body.length).toBeGreaterThan(1000);
});

test('Ensure quotes returns 200 with only terran quotes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      faction: ['Human']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['faction']).toBe('Terran');
  });
});

test('Ensure quotes returns 200 with no terran or zerg quotes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_faction: ['Terran', 'Zerg']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['faction']).not.toBe('Terran');
    expect(element['faction']).not.toBe('Zerg');
  });
});

test('Ensure quotes returns 200 with only marine unit', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      unit: ['Marine']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['unit']).toBe('Marine');
  });
});

test('Ensure quotes returns 200 with no marine or marauder units', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_unit: ['Marine', 'Marauder']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['unit']).not.toBe('Marine');
    expect(element['unit']).not.toBe('Marauder');
  });
});

test('Ensure quotes returns 200 with only pissed action', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      action: ['Pissed']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['action']).toBe('Pissed');
  });
});

test('Ensure quotes returns 200 with no pissed or attack actions', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_action: ['Pissed', 'Attack']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['action']).not.toBe('Pissed');
    expect(element['action']).not.toBe('Attack');
  });
});

test('Ensure quotes returns 200 with only queried text', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      text: ['Death']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['value']).toContain('Death');
  });
});

test('Ensure quotes returns 200 with only heroes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_hero: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isHero']).toBe(true);
  });
});

test('Ensure quotes returns 200 with no heroes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_hero: ['false']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isHero']).toBe(false);
  });
});

test('Ensure quotes returns 200 with only melee', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_melee: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isMelee']).toBe(true);
  });
});

test('Ensure quotes returns 200 with no melee', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_melee: ['false']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isMelee']).toBe(false);
  });
});

test('Ensure quotes returns 200 with correct limit and offset', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      limit: [100]
    }
  });
  expect(response['statusCode']).toBe(200);
  let body = JSON.parse(response['body']);
  expect(body.length).toBe(100);

  let response2 = await handler.quotes({
    multiValueQueryStringParameters: {
      limit: [100],
      offset: [50]
    }
  });
  expect(response2['statusCode']).toBe(200);
  let body2 = JSON.parse(response2['body']);
  expect(body2.length).toBe(100);

  expect(body[50]).toStrictEqual(body2[0]);
});

test('Ensure quotesRandom returns 200 with random quote', async () => {
  let response = await handler.quotesRandom({
    multiValueQueryStringParameters: {
      unit: ['Marine'],
      action: ['Pissed']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body['value']).toBeDefined();
  expect(body['faction']).toBe('Terran');
  expect(body['unit']).toBe('Marine');
  expect(body['action']).toBe('Pissed');
  expect(body['id']).toBeDefined();
});

test('Ensure quoteId returns 200 with correct quote', async () => {
  let response = await handler.quotesId({
    pathParameters: { id: 'cd3f3bbf-3d8d-5d03-bb62-a101dff972e9' }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body['value']).toBe('SCV ready.');
  expect(body['faction']).toBe('Terran');
  expect(body['unit']).toBe('SCV');
  expect(body['action']).toBe('Trained');
  expect(body['id']).toBe('cd3f3bbf-3d8d-5d03-bb62-a101dff972e9');
});

test('Ensure quoteId returns 400 with message', async () => {
  let response = await handler.quotesId({
    pathParameters: { id: 'yahaha!' }
  });
  expect(response['statusCode']).toBe(400);

  let body = JSON.parse(response['body']);
  expect(body['message']).toBe(
    'Invalid request. Quote with id yahaha! was not found.'
  );
});

test('Ensures all factions are returend', async () => {
  let response = await handler.factions();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(FACTIONS);
});

test('Ensure all units are returend', async () => {
  let response = await handler.units();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(UNITS);
});

test('Ensure only hero units are returned', async () => {
  let response = await handler.units({
    multiValueQueryStringParameters: {
      is_hero: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  // Could use a better test
  expect(JSON.parse(response['body']).length).toBeLessThan(50);
});

test('Ensure only four units are returned with offset', async () => {
  let response = await handler.units({
    multiValueQueryStringParameters: {
      limit: ['4'],
      offset: ['4']
    }
  });
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body']).length).toEqual(4);
  expect(JSON.parse(response['body'])[0]).toBe('Hellbat');
});

test('Ensures all actions are returend', async () => {
  let response = await handler.actions();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(ACTIONS);
});
