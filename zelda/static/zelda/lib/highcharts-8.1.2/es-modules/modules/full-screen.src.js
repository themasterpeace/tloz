bled):hover:not(.disabled), button.dt-button.active:not(.disabled):hover:not(.disabled),
div.dt-button:active:not(.disabled):hover:not(.disabled),
div.dt-button.active:not(.disabled):hover:not(.disabled),
a.dt-button:active:not(.disabled):hover:not(.disabled),
a.dt-button.active:not(.disabled):hover:not(.disabled) {
  box-shadow: inset 1px 1px 3px #999999;
  background-color: #cccccc;
  /* Fallback */
  background-image: -webkit-linear-gradient(top, #eaeaea 0%, #cccccc 100%);
  /* Chrome 10+, Saf5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(top, #eaeaea 0%, #cccccc 100%);
  /* FF3.6 */
  background-image: -ms-linear-gradient(top, #eaeaea 0%, #cccccc 100%);
  /* IE10 */
  background-image: -o-linear-gradient(top, #eaeaea 0%, #cccccc 100%);
  /* Opera 11.10+ */
  background-image: linear-gradient(to bottom, #eaeaea 0%, #cccccc 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#eaeaea', EndColorStr='#cccccc');
}
button.dt-button:hover,
div.dt-button:hover,
a.dt-button:hover {
  text-decoration: none;
}
button.dt-button:hover:not(.disabled),
div.dt-button:hover:not(.disabled),
a.dt-button:hover:not(.disabled) {
  border: 1px solid #666;
  background-color: #e0e0e0;
  /* Fallback */
  background-image: -webkit-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);
  /* Chrome 10+, Saf5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);
  /* FF3.6 */
  background-image: -ms-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);
  /* IE10 */
  background-image: -o-linear-gradient(top, #f9f9f9 0%, #e0e0e0 100%);
  /* Opera 11.10+ */
  background-image: linear-gradient(to bottom, #f9f9f9 0%, #e0e0e0 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f9f9f9', EndColorStr='#e0e0e0');
}
button.dt-button:focus:not(.disabled),
div.dt-button:focus:not(.disabled),
a.dt-button:focus:not(.disabled) {
  border: 1px solid #426c9e;
  text-shadow: 0 1px 0 #c4def1;
  outline: none;
  background-color: #79ace9;
  /* Fallback */
  background-image: -webkit-linear-gradient(top, #bddef4 0%, #79ace9 100%);
  /* Chrome 10+, Saf5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(top, #bddef4 0%, #79ace9 100%);
  /* FF3.6 */
  background-image: -ms-linear-gradient(top, #bddef4 0%, #79ace9 100%);
  /* IE10 */
  background-image: -o-linear-gradient(top, #bddef4 0%, #79ace9 100%);
  /* Opera 11.10+ */
  background-image: linear-gradient(to bottom, #bddef4 0%, #79ace9 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#bddef4', EndColorStr='#79ace9');
}

.dt-button embed {
  outline: none;
}

div.dt-buttons {
  position: relative;
  float: left;
}
div.dt-buttons.buttons-right {
  float: right;
}

div.dt-button-collection {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  margin-top: 3px;
  padding: 8px 8px 4px 8px;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: white;
  overflow: hidden;
  z-index: 2002;
  border-radius: 5px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
div.dt-button-collection button.dt-button,
div.dt-button-collection div.dt-button,
div.dt-button-collection a.dt-button {
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  display: block;
  float: none;
  margin-bottom: 4px;
  margin-right: 0;
}
div.dt-button-collection button.dt-button:active:not(.disabled), div.dt-button-collection button.dt-button.active:not(.disabled),
div.dt-button-collection div.dt-button:active:not(.disabled),
div.dt-button-collection div.dt-button.active:not(.disabled),
div.dt-button-collection a.dt-button:active:not(.disabled),
div.dt-button-collection a.dt-button.active:not(.disabled) {
  background-color: #dadada;
  /* Fallback */
  background-image: -webkit-linear-gradient(top, #f0f0f0 0%, #dadada 100%);
  /* Chrome 10+, Saf5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(top, #f0f0f0 0%, #dadada 100%);
  /* FF3.6 */
  background-image: -ms-linear-gradient(top, #f0f0f0 0%, #dadada 100%);
  /* IE10 */
  background-image: -o-linear-gradient(top, #f0f0f0 0%, #dadada 100%);
  /* Opera 11.10+ */
  background-image: linear-gradient(to bottom, #f0f0f0 0%, #dadada 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#f0f0f0', EndColorStr='#dadada');
  box-shadow: inset 1px 1px 3px #666;
}
div.dt-button-collection.fixed {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  border-radius: 0;
}
div.dt-button-collection.fixed.two-column {
  margin-left: -200px;
}
div.dt-button-collection.fixed.three-column {
  margin-left: -225px;
}
div.dt-button-collection.fixed.four-column {
  margin-left: -300px;
}
div.dt-button-collection > :last-child {
  display: block !important;
  -webkit-column-gap: 8px;
  -moz-column-gap: 8px;
  -ms-column-gap: 8px;
  -o-column-gap: 8px;
  column-gap: 8px;
}
div.dt-button-collection > :last-child > * {
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
}
div.dt-button-collection.two-column {
  width: 400px;
}
div.dt-button-collection.two-column > :last-child {
  padding-bottom: 1px;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  -ms-column-count: 2;
  -o-column-count: 2;
  column-count: 2;
}
div.dt-button-collection.three-column {
  width: 450px;
}
div.dt-button-collection.three-column > :last-child {
  padding-bottom: 1px;
  -webkit-column-count: 3;
  -moz-column-count: 3;
  -ms-column-count: 3;
  -o-column-count: 3;
  column-count: 3;
}
div.dt-button-collection.four-column {
  width: 600px;
}
div.dt-button-collection.four-column > :last-child {
  padding-bottom: 1px;
  -webkit-column-count: 4;
  -moz-column-count: 4;
  -ms-column-count: 4;
  -o-column-count: 4;
  column-count: 4;
}
div.dt-button-collection .dt-button {
  border-radius: 0;
}

div.dt-button-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  /* Fallback */
  background: -ms-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  /* IE10 Consumer Preview */
  background: -moz-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  /* Firefox */
  background: -o-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  /* Opera */
  background: -webkit-gradient(radial, center center, 0, center center, 497, color-stop(0, rgba(0, 0, 0, 0.3)), color-stop(1, rgba(0, 0, 0, 0.7)));
  /* Webkit (Safari/Chrome 10) */
  background: -webkit-radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  /* Webkit (Chrome 11+) */
  background: radial-gradient(ellipse farthest-corner at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  /* W3C Markup, IE10 Release Preview */
  z-index: 2001;
}

@media screen and (max-width: 640px) {
  div.dt-buttons {
    float: none !important;
    text-align: center;
  }
}
button.dt-button.processing,
div.dt-button.processing,
a.dt-button.processing {
  color: rgba(0, 0, 0, 0.2);
}
button.dt-button.processing:after,
div.dt-button.processing:after,
a.dt-button.processing:after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  box-sizing: border-box;
  display: block;
  content: ' ';
  border: 2px solid #282828;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  ani