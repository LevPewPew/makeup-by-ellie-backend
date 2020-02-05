const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const Service = require('../models/service');

beforeAll(async () => {
  const url = process.env.DB_URL;
  await mongoose.connect(url, { useNewUrlParser: true });
});

it("Test the root route", async done => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("goodbye world");
  done();
});

it("Test the question route", async done => {
  const response = await request.get("/questions");
  expect(response.status).toBe(200);
  done();
});

it("Test the portfolio route", async done => {
  const response = await request.get("/portfolio");
  expect(response.status).toBe(200);
  done();
});

it("Test the service route", async done => {
  const response = await request.get("/services");
  expect(response.status).toBe(200);
  done();
});

it("Check for correct admin login", async done => {
  const response = await request.post("/admin-login").send({
    username: "admin",
    password: "test"
  });
  expect(response.status).toBe(200);
  done();
});

it("Check for incorrect admin login", async done => {
  const response = await request.post("/admin-login").send({
    username: "admin",
    password: "test111"
  });
  expect(response.body.status).toBe(403);
  done();
});

it("Check for incorrect path response", async done => {
  const response = await request.get("/incorrect-path");
  expect(response.status).toBe(404);
  done();
});


it("Should check for a particular category", async done => {
  
  const category = await Service.findOne({ title: "EVENT/SPECIAL OCCASION MAKEUP" });
  done();
});


it("Check for contact route", async done => {
  const response = await request.get("/contact");
  expect(response.status).toBe(200);
  done();
});

it("Contact form submission should send back status 200 for correct form entries ", async done => {
  const response = await request.post("/contact").send({
    name: "Test",
    mobile: "45628281",
    email: "abc@test.com",
    eventDate: "2020-02-01",
    serviceType: "ABCD",
    totalPeopleJustMakeup: 1,
    totalPeopleWithHair: 1,
    timeToFinish: "12pm",
    howDidYouHear: "Google",
    addedQuestionsOrInfo: "None"
  });
  expect(response.status).toBe(200);
  done();
});


it("Contact form submission should send back status 400 for incorrect form entries ", async done => {
  const response = await request.post("/contact").send({
    name: "admin",
    password: "test111"
  });
  expect(response.status).toBe(400);
  done();
});