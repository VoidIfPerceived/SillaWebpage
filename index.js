//INSTRUCTIONS: C.reate R.ead U.pdate D.elete Application

/*
    Create a full CRUD application of your choice using an API or JSON Server.
    Use JQuery/AJAX to interact with the API. 
    Use a form to post new entities.
    Build a way for users to update or delete entities.
    Include a way to get entities from the API.
    Use Bootstrap and CSS to style your project.
*/




/*
Recommended API:

    MockAPI - This is one of the most popular APIs with our mentors! 
    You are free to use an API of your choosing; however, it must support all CRUD operations.
    Refer to the Week 12 Lab for how to use db.json/json-server
*/



/*
Suggestion to alleviate CORS policy errors:

    If you are having trouble accessing any of these APIs and you are getting a CORS policy error, try running your app on a live server.
    You can install one via the command line:
        npm install live-server -g
        To run the live server, navigate to your project directory in the command line, then run live-server



*/

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(name, position) {
        this.players.push(new Player(name, position));
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.position = position;
    }
}

class TeamServer {
    static url = "" //(mockAPI)

    static getAllTeams() {
        return $.get(this.url);
    }

    static getTeam(id) {
        return $.get(this.url + `/${id}`);
    }

    static createTeam(team) {
        return $.post(this.url, team);
    }

    static updateTeam(team) {
        return $.ajax({
            url: this.url + `/${team._id}`,
            dataType: 'json',
            data: JSON.stringify(team),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteTeam(id) {
        return $/ajax ({
            url: this.url + `/${id}`,
            type: 'DELETE'
        })
    }
}

class DOMManager {
    static teams;

    static getAllTeams() {
        TeamServer.getAllTeams().then(teams => this.render(teams));
    }

    static render(teams) {
        this.teams = teams;
        $("#app").empty();
        for (let team of teams) {
            $("#app").prepend(
                `<div id="${team._id}" class="card">
                    <div class="card-header">
                        <h2>${team.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteTeam("${team._id}")">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${team._id}-player-name" class="form-control" placeholder="Player Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${team._id}-player-position" class="form-control" placeholder="Player Position">
                                </div>
                            </div>
                            <button id="${team._id}-new-player" onclick="DOMManager.addPlayer("${team._id}")" class="btn btn-primary form-control">Add Player</button>
                        </div>
                    </div>
                </div><br>`
            );
            for (let player of team.players) {
                $(`#${team._id}`.find(".card-body").append(
                    `<p>
                    <span id="name-${player._id}"><strong>Name: </strong> ${player.name}</span>
                    <span id="position-${player._id}"><strong>Position: </strong> ${player.position}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deletePlayer("${team._id}", "${player._id}")">Delete Player</button>`
                ))
            }
        }
    }
}

DOMManager.getAllTeams();