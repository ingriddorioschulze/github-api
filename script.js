Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

const username = $(".username");
const password = $(".password");
const gitusername = $(".gitusername");
const repositories = $(".results");

$(".button").on("click", () => {
    $.ajax({
        url: `https://api.github.com/users/${gitusername.val()}/repos`,
        headers: {
            Authorization:
                "Basic " + btoa(username.val() + ":" + password.val())
        },
        success: data => {
            repositories.html(
                Handlebars.templates.repositories({ repositories: data })
            );
        }
    });
});

repositories.on("click", ".fullname", e => {
    const reponame = $(e.target).text();
    $.ajax({
        url: `https://api.github.com/repos/${reponame}/commits`,
        data: {
            per_page: 10
        },
        headers: {
            Authorization:
                "Basic " + btoa(username.val() + ":" + password.val())
        },
        success: data => {
            $(e.target)
                .next()
                .html(Handlebars.templates.commits({ commits: data }));
        }
    });
});
