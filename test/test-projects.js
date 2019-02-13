const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Project = require('../models/project.js');

chai.use(chaiHttp);
const agent = chai.request.agent(server);

const sampleProject = {
    title: 'Tinder for dog owners',
    description: 'App that allows not only people but also their dogs to find their love',
    developerNeeded: 'Front End, Back End, IOS app developer',
    author: 'dwayne123'
}
const user = { username: 'dwayne123', password: 'dwaynespass' }


describe('Projects', () => {

    before((done) => {
        agent
            .post('/login')
            .send(user)
            .end((err, res) => {
                done();
            })

    })

    after(() => {
        Project.deleteMany({ title: 'Test Title' }).exec((err, projects) => {
            console.log(projects)
            return projects.remove();
        })
    });

    // TEST INDEX
    it('should index ALL projects on /projects GET', (done) => {
        agent
            .get('/projects')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    it('should display new form on /projects/new GET', (done) => {
        agent
            .get(`/projects/new`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST CREATE
    it('should create a SINGLE project on /ideas POST', (done) => {
        agent
            .post('/projects')
            .send(sampleProject)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST SHOW
    it('should show a SINGLE project on /projects/<id> GET', (done) => {
        var project = new Project(sampleProject);
        const sampleId = '5bad4ff730cf354056asdafas';
        project.save((err, data) => {
            agent
                .get(`/projects/${sampleId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE project on /projects/<id>/edit GET', (done) => {
        var project = new Project(sampleProject);
        const sampleId = '5bad4ff730cf354056asdafas';
        project.save((err, data) => {
            agent
                .get(`/projects/${sampleId}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST UPDATE
    it('should update a SINGLE project on /projects/<id> PUT', (done) => {
        var project = new Project(sampleProject);
        const sampleId = '5bad4ff730cf354056asdafas';
        project.save((err, data) => {
            agent
                .put(`/projects/${sampleId}?_method=PUT`)
                .send({ 'title': 'Updating the title' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE project on /projects/<id> DELETE', (done) => {
        var project = new Project(sampleProject);
        const sampleId = '5bad4ff730cf354056asdafas';
        project.save((err, data) => {
            agent
                .delete(`/projects/${sampleId}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
});