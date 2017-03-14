import React = require('react');
import ReactDom = require('react-dom');
import MainDomFile = require('./components/maindom');

ReactDom.render(
    new MainDomFile.MainDom.MainDomVm().intoDom(),
    document.getElementById("ACT-DIV-SHELL")
)
