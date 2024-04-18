import createApplication from "../src/server";

test('create application', () => {
    const app = createApplication()
   

app.listen(8000)
    expect(app)
  });