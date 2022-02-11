import server from '../src/server';
console.log(server);

test('tests base route maybe', () => {
  const testUrl = "https://thriftbooks.com/";
  return server.gatherSiteInformation(testUrl).then(data => {
    expect(data).toBe('peanut butter');
  });
})
