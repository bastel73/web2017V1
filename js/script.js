'use strict';
let contentBox;
let xml;
let xsl;
let clickTarget;

/*The following function is called in order to show the initial content*/
function showInitialContent() {

    articleData('workingArea','initialContent.xml', 'initial.xsl');
}
/*The content of the <article> section is processed with this function. All the content is generated via an xslt-processor,
* since it can be changed via an xml file.*/
function articleData(viewElement, source, styleSource) {
    let xsltProcessor = new XSLTProcessor();
    let resultDocument;
    let content;

    xml = getXmlData(source);
    xsl = getXmlData(styleSource);

    contentBox=document.getElementsByClassName(viewElement)[0];
    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild);
    }
    if(viewElement==='modal') {
        //not very elegant, but does the trick; inline-styling
        contentBox.style.display = 'flex';
        contentBox.style.flexDirection='column';
        contentBox.style.justifyContent='center';
        contentBox.style.alignItems='center';
        console.log(contentBox.style.display);
        contentBox.addEventListener('click', clickOutside, false);
    }


    if (window.ActiveXObject) {
        content = xml.transformNode(xsl);
        contentBox.innerHTML = content;
    } else {
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        contentBox.appendChild(resultDocument);
    }
    let imgTags=contentBox.getElementsByClassName('thumb');

    for(let i=0;i<imgTags.length;i++){
        imgTags[i].addEventListener('click', showModal, false)
    }

    if(!(viewElement==='modal'||source==='initialContent.xml'||source==='trainingData.xml'||source==='pictures.xml')){
        contentBox.appendChild(addNavSection());
    }

}

/*function to close a modal window*/
function clickOutside(e) {
    let modal=document.getElementsByClassName('modal')[0];
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}
/*function returns an xml or xsl file via XHR*/
function getXmlData(fileName) {
    let returnData;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            returnData = xhttp.responseXML;
        }
    };

    xhttp.open('GET', fileName, false);
    xhttp.send();
    return returnData;
}
/*the <aside> section is filled with content via the following function*/
function remindMe() {

    let eventMap;

    contentBox = document.getElementsByTagName('aside')[0];
    xml = getXmlData('matches.xml');
    processSideList(contentBox);
    eventMap = getEventMapFromXMLDoc(xml, '/matches/season[1]/match');
    processRemindMeLists(eventMap);

}
/*In this function the work with xpath is demonstrated.*/
function getEventMapFromXMLDoc(xml, path) {
    let nameOfSeason;
    let currentSeason;
    let eventMap = new Map();
    let result;
    console.log(xml.getElementsByTagName('currentSeason')[0].toString());
    if (xml.evaluate) {
        let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        result = xml.valueOf("/matches", xml, null, XPathResult.ANY_TYPE, null);
        currentSeason = result.getElementsByTagName('currentSeason')[0].childNodes[0].nodeValue;
        result = xml.valueOf("/matches/season[1]", xml, null, XPathResult.ANY_TYPE, null);
        nameOfSeason = result.getElementsByTagName('nameOfSeason')[0].childNodes[0].nodeValue;

        result = nodes.iterateNext();
        while (result) {
            let eventObject = {};
            Object.defineProperty(eventObject, 'dateOfEvent', {value: new Date(result.getElementsByTagName('dateOfMatch')[0].childNodes[0].nodeValue)});
            Object.defineProperty(eventObject, 'nameOfEvent', {value: result.getElementsByTagName('nameOfMatch')[0].childNodes[0].nodeValue});
            eventMap.set(eventObject.dateOfEvent, eventObject.nameOfEvent);

            result = nodes.iterateNext();
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType === "msxml-document") {
        let nodes;
        xml.setProperty("SelectionLanguage", "XPath");
        nodes = xml.selectNodes("/matches");
        currentSeason = nodes[0].getElementsByTagName('currentSeason')[0].childNodes[0].nodeValue;
        nodes = xml.selectNodes("/matches/season");
        nameOfSeason = nodes[0].getElementsByTagName('nameOfSeason')[0].childNodes[0].nodeValue;
        nodes = xml.selectNodes(path);
        for (let i = 0; i < nodes.length; i++) {
            let eventObject = {};
            Object.defineProperty(eventObject, 'dateOfEvent', {value: new Date(nodes[i].getElementsByTagName('dateOfMatch')[0].childNodes[0].nodeValue)});
            Object.defineProperty(eventObject, 'nameOfEvent', {value: nodes[i].getElementsByTagName('nameOfMatch')[0].childNodes[0].nodeValue});
            eventMap.set(eventObject.dateOfEvent, eventObject.nameOfEvent);
        }
    }
    eventMap.set('currentSeason', currentSeason);
    eventMap.set('nameOfSeason', nameOfSeason);
    return eventMap;
}
/*With this function the upcoming events and the season events will be filtered and displayed accordingly.*/

function processRemindMeLists(eventMap) {
    let today = new Date();
    let days = 1000 * 60 * 60 * 24;
    let keys = [];
    let dateDifference;

    for (let key of eventMap.keys()) {
        if (key.toString() !== 'currentSeason' && key.toString() !== 'nameOfSeason')
            keys.push(key)
    }

    keys.sort(compare);

    for (let date of keys) {
        dateDifference = date - today;

        if (dateDifference / days <= 7 && dateDifference / days >= 0) {
            let event = document.createTextNode(date.toLocaleDateString() + " --> " + eventMap.get(date));
            let listItem = document.createElement('li');
            listItem.appendChild(event);

            document.getElementById('thisWeekList').appendChild(listItem);
        }
        if (date.getMonth() === today.getMonth() && dateDifference / days >= 0) {
            let event = document.createTextNode(date.toLocaleDateString() + " --> " + eventMap.get(date));
            let listItem = document.createElement('li');
            listItem.appendChild(event);

            document.getElementById('thisMonthList').appendChild(listItem);
        }
        if (eventMap.get('currentSeason') === eventMap.get('nameOfSeason')) {
            let event = document.createTextNode(date.toLocaleDateString() + " --> " + eventMap.get(date));
            let listItem = document.createElement('li');
            listItem.appendChild(event);

            document.getElementById('thisSeasonList').appendChild(listItem);
        }
    }
}
/*Helper function in order to sort the events by date.*/
function compare(value1, value2) {
    switch (value1 < value2) {
        case true:
            return -1;

        case false:
            return 1;

        default:
            return 0;

    }
}
/*On a modal window displaying either the official games or the tournaments a button is added in order to get the
* lineup for the next event to show up in a modal window.*/
function addNavSection(){

    let navElement=document.createElement('div');
    navElement.setAttribute('id', '1');
    navElement.setAttribute('class','navItem');
    navElement.setAttribute('onClick','articleData("modal","lineUp.xml", "lineUp.xsl")');
    navElement.innerHTML="<a id='1' href='#'>Aufstellung</a>";
    navElement.addEventListener('click', showModal, false);
    return navElement;
}
/*The basic html-content for the asisde-section is processed in this function.*/
function processSideList(htmlFragment) {

    htmlFragment.innerHTML =
        "<h1>Die nächsten Spiele</h1>" +
        "<p id='thisWeek' class='sideParagraph'>Diese Woche</p>" +
        "<ul id='thisWeekList'></ul>" +
        "<p id='thisMonth'>Diesen Monat</p>" +
        "<ul id='thisMonthList'></ul>" +
        "<p id='thisSeason'>Diese Saison</p>" +
        "<ul id='thisSeasonList'></ul>";
}
/*This function toggles the side menu on and off and shifts the main page area.*/
function toggleMenu() {
    contentBox = document.getElementsByClassName('mainPage')[0];
    if (contentBox.getAttribute('class') === 'mainPage') {

        contentBox.setAttribute('class', 'mainPage navWrapper-open');
    }
    else
        contentBox.setAttribute('class', 'mainPage');
    console.log(contentBox.getAttribute('class'));
}
/*The side menu is shifted back and the main page area is back at the origin.*/
function closeMenu(){
    contentBox=document.getElementsByClassName('mainPage')[0];
    if(contentBox.getAttribute('class')==='mainPage navWrapper-open')
        contentBox.setAttribute('class', 'mainPage');
}
/*A modal window is closed.*/
function closeModal(){
    contentBox=document.getElementsByClassName('modal')[clickTarget];
    contentBox.style.display='none';

}
/*The modal window is shown and styled inline*/
function showModal(ev){
    clickTarget=ev.target.id-1;

    contentBox=document.getElementsByClassName('modal')[clickTarget];
    ev.stopPropagation();
    contentBox.style.display = 'flex';
    contentBox.style.flexDirection='column';
    contentBox.style.justifyContent='center';
    contentBox.style.alignItems='center';

}