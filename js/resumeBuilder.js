/*
This file contains all of the code needed to create four JSONs corresponding
to four distinct sections in index.html: work, education, projects and a
header with biographical information.

In addition, this file also uses code from helper.js to render index.html
correctly.
 */

/* function to display the top navigation bar */
function displayNavigation() {
  // html anchors and their values used in the top navigation bar
  var menuAnchors = [
    {'anchor': 'workExperience', 'name': 'Work'},
    {'anchor': 'projects', 'name': 'Projects'},
    {'anchor': 'education', 'name': 'Education'},
    {'anchor': 'map-div', 'name': 'Map'}
  ];

  // add html tags for site name and menu list
  $('.menu').
    prepend(HTMLsiteName).
    append(HTMLmenuItems);

  // for each anchor, add them to the menu list after formatting
  menuAnchors.forEach(function (item) {
    var formattedMenuItem = HTMLmenuItem.
      replace('#', '#' + item.anchor).
      replace('%data%', item.name);

    $('.menu-items').append(formattedMenuItem);
  });
}

/* JSON object containing biographical info */
var bio = {
  'name': 'Suramya Shah',
  'role': 'Front-End Web Developer',
  'contacts': {
    'mobile': '123-456-789',
    'email': 'contact@suramya.org',
    'github': 'ss22ever',
    'twitter': '@shah_suramya',
    'location': 'Jaipur,Rajasthan'
  },
  'welcomeMessage': 'Welcome!',
  'skills': [
    'Python',
    'JavaScript',
    'c/c++/Java',
    'Php',
    'HTML/CSS',
    'Bootstrap',
    'Linux'
  ],
  'biopic': 'images/pic.jpg'
};

// function to display all bio related data after formatting
bio.display = function() {
  var formattedName = HTMLheaderName.
    replace('%data%', bio.name);
  var formattedRole = HTMLheaderRole.
    replace('%data%', bio.role);

  var formattedMobile = HTMLmobile.
    replace('%data%', bio.contacts.mobile);
  var formattedEmail= HTMLemail.
    replace('%data%', bio.contacts.email);
  var formattedTwitter= HTMLtwitter.
    replace('%data%', bio.contacts.twitter);
  var formattedGithub = HTMLgithub.
    replace('%data%', bio.contacts.github);
  var formattedLocation = HTMLlocation.
    replace('%data%', bio.contacts.location);

  var formattedBioPic = HTMLbioPic.
    replace('%data%', bio.biopic);
  var formattedWelcomeMessage = HTMLwelcomeMsg.
    replace('%data%', bio.welcomeMessage);

  var contactItems = [
    formattedMobile,
    formattedEmail,
    formattedTwitter,
    formattedGithub,
    formattedLocation
  ];

  $('#header').
    prepend(formattedName + formattedRole).
    append(formattedBioPic + formattedWelcomeMessage).
    append(HTMLskillsStart);

  $('#topContacts').prepend(contactItems);
  $('#footerContacts').prepend(contactItems);

  bio.skills.forEach(function (skill) {
    var formattedSkill = HTMLskills.replace('%data%', skill);
    $('#skills').append(formattedSkill);
  });
};


/* JSON object containing work info */
var work = {
  'jobs': [
    {
      'employer': 'Geeks for Geeks',
      'title': 'Campus Ambassador',
      'location': 'Jaipur,Rajasthan,India',
      'dates': '2016 - 2017',
      'description': 'Ran and managed a Geeks for Geeks Campus club.'
    },
    {
      'employer': 'Greymeter',
      'title': 'Technical Content Writer',
      'location': 'Jaipur,Rajasthan,India',
      'dates': '2015 - 2016',
      'description': 'Answered technical queries on the forum'
    }
  ]
};

// function to display all work related data after formatting
work.display =  function(){
  work.jobs.forEach(function(workEntry) {
    var formattedWorkEmployer = HTMLworkEmployer.
      replace('%data%', workEntry.employer);
    var formattedWorkTitle = HTMLworkTitle.
      replace('%data%', workEntry.title);
    var formattedWorkLocation = HTMLworkLocation.
      replace('%data%', workEntry.location);
    var formattedWorkDates = HTMLworkDates.
      replace('%data%', workEntry.dates);
    var formattedWorkDescription = HTMLworkDescription.
      replace('%data%', workEntry.description);

    $('#workExperience').append(HTMLworkStart);
    $('.work-entry:last').
      append(
      formattedWorkEmployer +
      formattedWorkTitle +
      formattedWorkLocation +
      formattedWorkDates +
      formattedWorkDescription
    );
  });
};


/* JSON object containing info on projects */
var projects = {
  'projects': [
    {
      'title': 'Udacity Front-End Web Developer Nanodegree - Portfolio Site',
      'dates': '2017',
      'description': 'One-page fully-responsive website to display a ' +
      'portfolio of projects. Written using HTML, CSS, jQuery, and Bootstrap.',
      'images': [
        'images/surport300x150.png',
        'images/surport2300x150.png'
      ]
    },
    {
      'title': 'Udacity Front-End Web Developer Nanodegree - Online Resume',
      'dates': '2017',
      'description': 'One-page responsive website for displaying an ' +
      'interactive online resume. Written using HTML, CSS, JavaScript, and ' +
      'jQuery.',
      'images': [
        'images/res300x150.png',
        'images/res2300x150.png'
      ]
    }
  ]
};

// function to display all projects related data after formatting
projects.display = function(){
  projects.projects.forEach(function(project) {
    var formattedProjectTitle = HTMLprojectTitle.
      replace('%data%', project.title);
    var formattedProjectDates = HTMLprojectDates.
      replace('%data%', project.dates);
    var formattedProjectDescription = HTMLprojectDescription.
      replace('%data%', project.description);

    $('#projects').append(HTMLprojectStart);
    $('.project-entry:last').append(
      formattedProjectTitle +
      formattedProjectDates +
      formattedProjectDescription
    );

    project.images.forEach(function (imageUrl) {
      var formattedProjectImage = HTMLprojectImage.
        replace('%data%', imageUrl);
      $('.project-entry:last').append(formattedProjectImage);
    });
  });
};


/* JSON object containing education info */
var education = {
  'schools': [
    { 'name': 'Banasthali University',
      'location': 'Jaipur Rajasthan',
      'degree': 'B.Tech',
      'majors': ['Information Technology'],
      'dates': '2014-2018',
      'url': 'http://www.banasthali.org'
    },
    {
      'name': 'APS Almora',
      'location': 'Uttrakhand India',
      'degree': 'Secondary Education',
      'majors': ['P+C+M+CS'],
      'dates': '2014',
      'url': 'http://www.apsalmora.org'
      }
  ],
  'onlineCourses': [
    {
      'title': 'Intro to HTML and CSS',
      'school': 'Udacity',
      'date': '2015',
      'url': 'https://www.udacity.com/course/intro-to-html-and-css--ud304'
    }
  ]
};

// function to display all education related data after formatting
education.display = function () {
  education.schools.forEach(function (school) {
    var formattedSchoolName = HTMLschoolName.
      replace('#', school.url).
      replace('%data%', school.name);
    var formattedSchoolDegree = HTMLschoolDegree.
      replace('%data%', school.degree);
    var formattedSchoolDates = HTMLschoolDates.
      replace('%data%', school.dates);
    var formattedSchoolLocation = HTMLschoolLocation.
      replace('%data%', school.location);

    $('#education').append(HTMLschoolStart);
    $('.education-entry:last').append(
      formattedSchoolName +
      formattedSchoolDegree +
      formattedSchoolDates +
      formattedSchoolLocation
    );

    school.majors.forEach(function (major) {
      var formattedSchoolMajor = HTMLschoolMajor.
        replace('%data%', major);
      $('.education-entry:last').append(formattedSchoolMajor);
    });
  });

  $('#education').append(HTMLonlineClasses);
  education.onlineCourses.forEach(function (onlineCourse) {
    var formattedOnlineTitle = HTMLonlineTitle.
      replace('%data%', onlineCourse.title).
      replace('#', onlineCourse.url);
    var formattedOnlineSchool = HTMLonlineSchool.
      replace('%data%', onlineCourse.school);
    var formattedOnlineDates = HTMLonlineDates.
      replace('%data%', onlineCourse.date);

    $('#education').append(HTMLonlineClassStart);
    $('.education-entry:last').append(
      formattedOnlineTitle +
      formattedOnlineSchool +
      formattedOnlineDates
    );
  });
};


// display top navigation bar
displayNavigation();

/* Execute display() from each object to render index.html correctly */

/* Bio */
bio.display();

/* Work */
work.display();

/* Projects */
projects.display();

/* Education */
education.display();

/* Append internationalizeButton to the main div */
$('#main').append(internationalizeButton);

/* Add a google map */
$('#map-div').append(googleMap);

