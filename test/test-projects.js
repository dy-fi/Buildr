const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Project = require('../models/project');

chai.use(chaiHttp);
const agent = chai.request.agent(server);

const sampleProject = {
    title: 'Tinder for dog owners',
    description: 'App that allows not only people but also their dogs to find their love',
    developerNeeded: 'Front End, Back End, IOS app developer',
    author: 'dwayne123'
}
const user = { username: 'dwayne123', password: 'dwaynespass' }
