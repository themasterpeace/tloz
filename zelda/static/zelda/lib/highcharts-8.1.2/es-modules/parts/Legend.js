.fa-2x {
  font-size: 2em; }

.fa-3x {
  font-size: 3em; }

.fa-4x {
  font-size: 4em; }

.fa-5x {
  font-size: 5em; }

.fa-6x {
  font-size: 6em; }

.fa-7x {
  font-size: 7em; }

.fa-8x {
  font-size: 8em; }

.fa-9x {
  font-size: 9em; }

.fa-10x {
  font-size: 10em; }

.fa-fw {
  text-align: center;
  width: 1.25em; }

.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0; }
  .fa-ul > li {
    position: relative; }

.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit; }

.fa-border {
  border: solid 0.08em #eee;
  border-radius: .1em;
  padding: .2em .25em .15em; }

.fa-pull-left {
  float: left; }

.fa-pull-right {
  float: right; }

.fa.fa-pull-left,
.fas.fa-pull-left,
.far.fa-pull-left,
.fal.fa-pull-left,
.fab.fa-pull-left {
  margin-right: .3em; }

.fa.fa-pull-right,
.fas.fa-pull-right,
.far.fa-pull-right,
.fal.fa-pull-right,
.fab.fa-pull-right {
  margin-left: .3em; }

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
          animation: fa-spin 2s infinite linear; }

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
          animation: fa-spin 1s infinite steps(8); }

@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg); }

.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg); }

.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg); }

.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1); }

.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1); }

.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1); }

:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-flip-both {
  -webkit-filter: none;
          filter: none; }

.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2.5em; }

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0; }

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em; }

.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em; }

.fa-inverse {
  color: #fff; }

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px; }

.sr-only-focusable:active, .sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto; }

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1); }

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4); }

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4); }

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1); }

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black; }

.fad.fa-inverse {
  color: #fff; }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                a
    4wb�  �                   @   s&   d dl mZmZ G dd� dej�ZdS )�    )�
migrations�modelsc                   @   sb   e Zd ZdgZejddejddgddgdd	gd
dgddgddgddgddggddd�dd�gZdS )�	Migration)�link�0013_alter_clientes_telefono�clientes�fpagor   z
POR COBRAR�   �CONTADO�   �CREDITO�   �PREPAGO�   zCREDITO X COBRAR�   zCONTADO X COBRAR�   zCREDITO X CREDITO�   �CORTESIAzFORMA DE PAGO)�choices�default�verbose_nameF)�
model_name�name�field�preserve_defaultN)	�__name__�
__module__�__qualname__�dependenciesr   �AddFieldr   �IntegerField�
operations� r"   r"   �K/home/linen/Documentos/GitHub/a/tloz/link/migrations/0014_clientes_fpago.pyr      s   �>��r   N)�	django.dbr   r   r   r"   r"   r"   r#   �<module>   s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        or-square{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-y-combinator-square:before{content:"\f1d4"}.fa.fa-yc-square{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-yc-square:before{content:"\f1d4"}.fa.fa-qq,.fa.fa-tencent-weibo,.fa.fa-wechat,.fa.fa-weixin{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-wechat:before{content:"\f1d7"}.fa.fa-send:before{content:"\f1d8"}.fa.fa-paper-plane-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-paper-plane-o:before{content:"\f1d8"}.fa.fa-send-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-send-o:before{content:"\f1d8"}.fa.fa-circle-thin{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-circle-thin:before{content:"\f111"}.fa.fa-header:before{content:"\f1dc"}.fa.fa-sliders:before{content:"\f1de"}.fa.fa-futbol-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-futbol-o:before{content:"\f1e3"}.fa.fa-soccer-ball-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-soccer-ball-o:before{content:"\f1e3"}.fa.fa-slideshare,.fa.fa-twitch,.fa.fa-yelp{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-newspaper-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-newspaper-o:before{content:"\f1ea"}.fa.fa-cc-amex,.fa.fa-cc-discover,.fa.fa-cc-mastercard,.fa.fa-cc-paypal,.fa.fa-cc-stripe,.fa.fa-cc-visa,.fa.fa-google-wallet,.fa.fa-paypal{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-bell-slash-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-bell-slash-o:before{content:"\f1f6"}.fa.fa-trash:before{content:"\f2ed"}.fa.fa-copyright{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-eyedropper:before{content:"\f1fb"}.fa.fa-area-chart:before{content:"\f1fe"}.fa.fa-pie-chart:before{content:"\f200"}.fa.fa-line-chart:before{content:"\f201"}.fa.fa-angellist,.fa.fa-ioxhost,.fa.fa-lastfm,.fa.fa-lastfm-square{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-cc{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-cc:before{content:"\f20a"}.fa.fa-ils:before,.fa.fa-shekel:before,.fa.fa-sheqel:before{content:"\f20b"}.fa.fa-meanpath{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-meanpath:before{content:"\f2b4"}.fa.fa-buysellads,.fa.fa-connectdevelop,.fa.fa-dashcube,.fa.fa-forumbee,.fa.fa-leanpub,.fa.fa-sellsy,.fa.fa-shirtsinbulk,.fa.fa-simplybuilt,.fa.fa-skyatlas{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-diamond{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-diamond:before{content:"\f3a5"}.fa.fa-intersex:before{content:"\f224"}.fa.fa-facebook-official{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-facebook-official:before{content:"\f09a"}.fa.fa-pinterest-p,.fa.fa-whatsapp{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-hotel:before{content:"\f236"}.fa.fa-medium,.fa.fa-viacoin,.fa.fa-y-combinator,.fa.fa-yc{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-yc:before{content:"\f23b"}.fa.fa-expeditedssl,.fa.fa-opencart,.fa.fa-optin-monster{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-battery-4:before,.fa.fa-battery:before{content:"\f240"}.fa.fa-battery-3:before{content:"\f241"}.fa.fa-battery-2:before{content:"\f242"}.fa.fa-battery-1:before{content:"\f243"}.fa.fa-battery-0:before{content:"\f244"}.fa.fa-object-group,.fa.fa-object-ungroup,.fa.fa-sticky-note-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-sticky-note-o:before{content:"\f249"}.fa.fa-cc-diners-club,.fa.fa-cc-jcb{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-clone,.fa.fa-hourglass-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hourglass-o:before{content:"\f254"}.fa.fa-hourglass-1:before{content:"\f251"}.fa.fa-hourglass-2:before{content:"\f252"}.fa.fa-hourglass-3:before{content:"\f253"}.fa.fa-hand-rock-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-rock-o:before{content:"\f255"}.fa.fa-hand-grab-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-grab-o:before{content:"\f255"}.fa.fa-hand-paper-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-paper-o:before{content:"\f256"}.fa.fa-hand-stop-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-stop-o:before{content:"\f256"}.fa.fa-hand-scissors-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-scissors-o:before{content:"\f257"}.fa.fa-hand-lizard-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-lizard-o:before{content:"\f258"}.fa.fa-hand-spock-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-spock-o:before{content:"\f259"}.fa.fa-hand-pointer-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-pointer-o:before{content:"\f25a"}.fa.fa-hand-peace-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-hand-peace-o:before{content:"\f25b"}.fa.fa-registered{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-chrome,.fa.fa-creative-commons,.fa.fa-firefox,.fa.fa-get-pocket,.fa.fa-gg,.fa.fa-gg-circle,.fa.fa-internet-explorer,.fa.fa-odnoklassniki,.fa.fa-odnoklassniki-square,.fa.fa-opera,.fa.fa-safari,.fa.fa-tripadvisor,.fa.fa-wikipedia-w{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-television:before{content:"\f26c"}.fa.fa-500px,.fa.fa-amazon,.fa.fa-contao{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-calendar-plus-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-calendar-plus-o:before{content:"\f271"}.fa.fa-calendar-minus-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-calendar-minus-o:before{content:"\f272"}.fa.fa-calendar-times-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-calendar-times-o:before{content:"\f273"}.fa.fa-calendar-check-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-calendar-check-o:before{content:"\f274"}.fa.fa-map-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-map-o:before{content:"\f279"}.fa.fa-commenting:before{content:"\f4ad"}.fa.fa-commenting-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-commenting-o:before{content:"\f4ad"}.fa.fa-houzz,.fa.fa-vimeo{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-vimeo:before{content:"\f27d"}.fa.fa-black-tie,.fa.fa-edge,.fa.fa-fonticons,.fa.fa-reddit-alien{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-credit-card-alt:before{content:"\f09d"}.fa.fa-codiepie,.fa.fa-fort-awesome,.fa.fa-mixcloud,.fa.fa-modx,.fa.fa-product-hunt,.fa.fa-scribd,.fa.fa-usb{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-pause-circle-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-pause-circle-o:before{content:"\f28b"}.fa.fa-stop-circle-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-stop-circle-o:before{content:"\f28d"}.fa.fa-bluetooth,.fa.fa-bluetooth-b,.fa.fa-envira,.fa.fa-gitlab,.fa.fa-wheelchair-alt,.fa.fa-wpbeginner,.fa.fa-wpforms{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-wheelchair-alt:before{content:"\f368"}.fa.fa-question-circle-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-question-circle-o:before{content:"\f059"}.fa.fa-volume-control-phone:before{content:"\f2a0"}.fa.fa-asl-interpreting:before{content:"\f2a3"}.fa.fa-deafness:before,.fa.fa-hard-of-hearing:before{content:"\f2a4"}.fa.fa-glide,.fa.fa-glide-g{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-signing:before{content:"\f2a7"}.fa.fa-first-order,.fa.fa-google-plus-official,.fa.fa-pied-piper,.fa.fa-snapchat,.fa.fa-snapchat-ghost,.fa.fa-snapchat-square,.fa.fa-themeisle,.fa.fa-viadeo,.fa.fa-viadeo-square,.fa.fa-yoast{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-google-plus-official:before{content:"\f2b3"}.fa.fa-google-plus-circle{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-google-plus-circle:before{content:"\f2b3"}.fa.fa-fa,.fa.fa-font-awesome{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-fa:before{content:"\f2b4"}.fa.fa-handshake-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-handshake-o:before{content:"\f2b5"}.fa.fa-envelope-open-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-envelope-open-o:before{content:"\f2b6"}.fa.fa-linode{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-address-book-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-address-book-o:before{content:"\f2b9"}.fa.fa-vcard:before{content:"\f2bb"}.fa.fa-address-card-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-address-card-o:before{content:"\f2bb"}.fa.fa-vcard-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-vcard-o:before{content:"\f2bb"}.fa.fa-user-circle-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-user-circle-o:before{content:"\f2bd"}.fa.fa-user-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-user-o:before{content:"\f007"}.fa.fa-id-badge{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-drivers-license:before{content:"\f2c2"}.fa.fa-id-card-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-id-card-o:before{content:"\f2c2"}.fa.fa-drivers-license-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-drivers-license-o:before{content:"\f2c2"}.fa.fa-free-code-camp,.fa.fa-quora,.fa.fa-telegram{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-thermometer-4:before,.fa.fa-thermometer:before{content:"\f2c7"}.fa.fa-thermometer-3:before{content:"\f2c8"}.fa.fa-thermometer-2:before{content:"\f2c9"}.fa.fa-thermometer-1:before{content:"\f2ca"}.fa.fa-thermometer-0:before{content:"\f2cb"}.fa.fa-bathtub:before,.fa.fa-s15:before{content:"\f2cd"}.fa.fa-window-maximize,.fa.fa-window-restore{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-times-rectangle:before{content:"\f410"}.fa.fa-window-close-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-window-close-o:before{content:"\f410"}.fa.fa-times-rectangle-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-times-rectangle-o:before{content:"\f410"}.fa.fa-bandcamp,.fa.fa-eercast,.fa.fa-etsy,.fa.fa-grav,.fa.fa-imdb,.fa.fa-ravelry{font-family:"Font Awesome 5 Brands";font-weight:400}.fa.fa-eercast:before{content:"\f2da"}.fa.fa-snowflake-o{font-family:"Font Awesome 5 Free";font-weight:400}.fa.fa-snowflake-o:before{content:"\f2dc"}.fa.fa-spotify,.fa.fa-superpowers,.fa.fa-wpexplorer{font-family:"Font Awesome 5 Brands";font-weight:400}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          x�\�s�8����+�M�J���cn�v<���W��;{3�K�i���P���bk����n @J�f2uN�rD��h4�@Yq���c����޾��գ,&y��W��d8�˺R�y�>�5ڏT�`�`ogﻝ�� M��-`��~�`o�{u�\�U�ƹzR�w>P��q�����?�y�)��d�CuuuM�hѰ��j" �{�75U]�ú�ý�x���U�\l��{
�t���b�c5-F�,Q>T���c����֯��zV`Z��ը�z�dϳ��A=4/`�%hM��V%(u� �4�d��i����%B��{/ve�jw4�^\$Y��3���a�b�oV���Lυhf� D
̮y��ˤ��y�=�[�qc���kV�����
�s����~vU�ʶ��n��o��~�K��3o�Ȃ��[��r�er�VuR�a�C|jד����
���h�8Z����&q��*?.�YR֋>��r	pg��G�l�-��<���$A�2��oH��~�z�xDU9�>V$%�7#�}	M���Z!4a��:��:M�ݗ��z�Ndw���|ܯJۂ�=؂��5mA7���Cw���Q'o߿{�\�|~z�N�=�������ԓ_����O��{}|���^�*@�@�z���_#�,�$,������/�%�2)I�"��L�k��=}�X��O���T��X�S�0~�<������<ú�����G��$~痉r�G�XR��cXd�i���4w��A�]�AE�צO�H�f��4����ڰ�}�Y�mu:I�����*�T��P��"�$�VWi=Q��^��Ɋ+|�g�R㢴KG��Éb:T��%:�_T|��(�<��IF�1V����J�\ՠGpF.�w�?�i��Ή�;ӢL���L�yK����p�=���^��v�s̻�dZXG�1ff>ϴ�Q�c�����ݪ^d��%�K��ɳ&N��U=m���,+�3��U#�8D}4�ް�9Q����\��(�j�3N��i�%�<����ô^x1�+���U��C���L�4?-NK�j��d��vzT��0Q���=�}����N�Z��6Lv���l���3�p=R'VQ<�4=A,tG=J/s�ݎ�IA����P~�� Ǚ�Z,cU//�)R'^�C���e�d�t���&�*�D��qz�d�Q��B�H�ɚZO��(qů�D�{U[���(н�2��F4W�%��k�LQj.��z�"��ع��e1��#R�9:��9,�j�ّ����&.dk�Y�TY�i\~J�J�9���e�&���f:y6jQ��5�r��!���~YƣJ��o9;p����_.�	j������遂<��?mY���'���B!��G��': ƤŀM�d([�/���HV�R<K��겍H"�!%s5���Z?H|(,�����]$w�M���5^���L`_� n�x�Ԓ�ri;7�]b��@o�bD!��������ݼ��Wɶ��&Kh��7��<ئ	s�a@�g���6R-v��<݆>�=^R�$��;�i$?*V��q��Q�̼�W|�9*�+� H�^E���:�#�혂�vO�ل��E1��C�I7�9B6�|��2��2�v��R89n#�wݡ5�,Up�0V��w�#�%n��&�=�� C�2���	g0��	V�"{�J�<��*s�����		wUH�Ҽ�!r���E׿ �{\��]�a?n���CC�>\&�E�\	BȜ-H��T77JAY�f�Cf�*�!��?"�$��Q3�1��E`�f�׶_?F����ǁZ�o���A:L���� �ef��Z��l�Wcd��u���Ѿp�_�LQ(j�u��E:���M��%��/C���H
��P�e삍؎o�#`�ԁ�����p�e(��`[C����������=*�k��W�>� ��U<X8������3�-��/�㺜'f�W	�9�g�(��)�����2L��{�#��}Ҕ>)꺘��Bq���A�V�*���vV5���T����RW�]M�(>ː�&xA+���\��i�~T{��wqo���m;�d�|^c�&�f��W箉�E�s�}מ��͈�Z1I!e�E��آF+��C��|ww�u+
�8�.��8��S���:�Cg��f��XvM"��1I�-��$ɢ��v7A-��䒢��P��I��w������_#'��a(�n�AK;O� ��p�����[�	t�+�N�3+-�� ���h�t��^��\)���r̚�aX�65&�Y���C�&�Tk#P�P�韝u����&�}M��_V��g� 0�$.;w�r�Ui+���c%A�G�a�f=�����(q�R�}���2U���,>ю���[pt����ڹ�Jo���Lvwo��	)VC�L@��؍�-��7:���}<��$u�Mϐ�5L�.K��dF$<
ɔ�>5�oMq�<��T	9J�(U��OZ"h����@��u`�`�N��;�������#�\o��ȳ'PIn�G⅃
���Nq0�2��@�G �x�1�4��6f�E#�3s��dE���b��]�i�aizc"���DL��^���C���	r��.�DNAe-�����C��QG��� �ݺ�N�8�� �8.�\��0�P=�;V����9�9�Cť"T?}{��7�*�v��[N��ð\��pkSl��~� �&sE�-6v0��ۛ�a<v�WN6�Ѵpv�W���t9^M�Dĳ�,y��ౣ�� uMP�*R��H�QW�B~�$�|�c>��B�i��i1��}#B���vCsF���AF�2�2Tَ��[��m�E}b���Do�Y����n���FZD��6%v�@��d�X�pP�UO�5�����}�J�]a�K)�V?��
d*x�c��n�jɼK�)���D�4�����)ue������q����t�a	giuFY�D�֖%e��V8�G`r�V�9�n8'Ǹ�K�IK��j��h�-����_�
J����� gn�G����%@��l�n�����.��Ng�Uo�Y{0sd���X �5�kk֎����0�KlW`���P}L@�;8�C��4����<��TdW�!�T��������vp�t����l�´Q� �ލ=��2�%4��׆���.˲�F�Q�_b��ƴ,�տ���EPS��G8e��y�F�PD�e�R4����y�ݳt�X�����oڪ���{fEQ[%�;��k��p��%ʫ��M��$Ź�~�t��!Zf��Ⴐ�,�О)��λ�6��Qqw��
~4S���$K(�c{��A��[�au�B�^�7"dAJ��"��oBa�W��-F5D#�20W�h6O����'�X��M3�w���Ji��"o�X0���~Z�W��F&�@��;��r�����y�mu����w�4�-��E�����L �o�i/�OP�2;<�Kd�8@�3���� 8"-چ�4��Q�+$��8�g��?�J��Vl�T��-:h�#ᦳm�@�Nh���'9�j5�_�m����3�yT%	� ���W��p��z��k4����>( X68mТ�#��
�=h��X����G�9!�^p��Y\>���2Pò�u|�1.��2�OON�E�sb�_�8z�=�<,k��@]����q�İϯ:�_�Aݠt==|}[O��jV���qY`�-�bm�"�&��Ķ+�<���Vl��a�V��H�y?:��r8��@�T��9���i��.|��=ڊ����4Ժ����+޸���'Q~���"���vs�߃<�K���h���Ki��
��ՖSZn��zB^W��7ژ�.�h�؊E����m2}�C}5�ݾ~��K���rG�ըH�����9�V�NOF���x�Ä�U���kܖ�O�V(%��N^��l�۲�����^JI�,���2��g)�,{��ԍ~&n�ģ�O������ɻrq���6���l��q#o�ğq�0�>
���G�_�s���	8Ɏ��d9���ν�E+���luܩ!����i-;�-*et���ᥫ�]�o��Ft�<��b���r�z�J:�)�@����V�m�-~P��z�ޒ���Vg0�PC;��YDG�K��l��e��<{Co�#��4��H��'��4�oDH�8����.md��E]f�i��g���DTwrG{����I'4BO���q�.o�߬�m���sP�h��]"�ˍ����]����@�{��q��4���]�������4���nӉ6=�c�<}�S�~�]L{xT�@d�=��CF���Y�Ly��۠ԙ��MN*
�XwWN�0؝�:�K=E�ݞ̞���J�	��Ǔ�>M\"�������H�����b�7�Q��u��|��qn�����G��C;�KL���.��[J|.�؁�G9���t�&�N,wt�E��r���ț7p�n8g�>ݷR��`$А咱������+�19�y���f��Ʌ�<��P�4�����x�{fe/h7��q�i�
Y�z�"4=�V�D{�_�p�8G0�.��8��b	���EqEI�U�����W�)�,���:˷0���\�P�	-¯a�ۘ<����՚jV�۩ۤ�ϯ b@�����8-�Z��%iI�8��	�K�r%,���QLF�OC�"�D��7����A�6AN8�8\<�M�)�'-�.������� �By7�i��9����Bf9�
v��BP���0�����]<�p�І\�_�Š	��c��eͻF5��z7^x渹[r�[��}:J)Zw��@P��&7�xM�8,Թ'�"xZ���-<����G��Y$����E?�nȿ���'a4��p?��-ߣq�C�6|A��U�Ҍ_�@��ř�hd���Ӑ*Oq<��IqU!�A�2v��qr�iq8���/��<�_���`��J;~��ݱ��8@���O��w2�>Ca⢰�l��h��֖�pƟ�4�����m�b�Xw'ncPǹ,�*�}��o ��
��{ԝ?���P��Ҿ�?uAp��{{/^��u�`h؋�`6��=�C�m�x��N�H�c@�_��Zɝ�t(�������)a's���]�� �c��x�-�N1�/U�9��c����P	�i�8SA|���w�J�:�&w�n����(;����rD�_i���u�����%�YB���W���	Y�^��/~)�����[y��˪V����vy͏iD$<=���_� -���÷��i,��B�{���M�9aɗS�˨[� TB���f���B� 7���	�Ҷ���Y��w4����f���̎Y��εtK9�5�bcD�|�Z���8��0��b{�uX�	G}� ş+~�b^٥��?D~��g�c�6��[w�hD���A����v��v_�g(��3}A�����ɟW��~a���q<���p������ͽ�����Vm^p                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            �   $       4                                  �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          xݽy|W�/Z������I-�խ�־��m˖�%��8�H�`�H��%�-�%NB �L��8��	���l�� 3~la�f�0������f�	��2�쐙�@�}��[ݒ�0����=���ԩS�~�����������`�o� 0A� 	c�v���m�{�%Ax���kw^�K��
©e�7���w`ۻҀ��~����o�}�ׂ [� �������˨I8�s<׏L�x�Ai#)'�vtjb2����ُ�+E�<$~��q�z���}�s��?+���C?��o�����f�_���O��8>Ֆ��UA8�SAPn���_�ݾm��7l�;����y���_}�.�����ᇟ;�ͽ���˟����u�y��p��|0,]�%��{�^)���9O
l�Eo2�7���?�ӂ��=�0�u�/	u�)�)(�'��Qw���_3),-�/=�a�a�	��8L8mbF���ʠ
OS]��]|�<���q���+��������)�w��SFGq��P��qŽ[����w��;�k�t�)��Q�9}��.ϣ2�~KH���*����떡rW�QY��-_�gq�.]����։<�����׿�ߥ�=��{���ޫ��<�������[K�w�g�ݔ7Z)W����w����r=��K� ������^�6�K����k�/;τ��'��,���f�esض$�Bǲ��-ǖS˭�=�#�;�_�|byvy~yq���凖߶|f�ϗ�.���^~v����\~q������������w^�u���{/�t��.>t���7�u�r����o.����t��/�qi����q靗>s�s�>鋗�r黗~|�__l{��?��w~�������n}��K���K�}��/}�Ͼ����5��U�����k`�`�F��*Xo�8v�����z�Q���U�^X���]����i�/_z��U���қ^z�����2��˾��_|������=����Ӿ��������}O���w��.�)߃�|'}��^�������u��|Q���c���s���/�?��g�~�>m��~������-���[�eo��{�/�?����w޿�~��Q�����}������ǽ��u��և�#�������	{$���濘/��`��������O�1�B��&M��������G���	/��K��C<%~[������z���Rv+�Q;Խ�sZ�vP{A?��`�i|ִ�M����=�<߶�V�z���7����d�����	���_���O��	l|&�<�P�ۡ=�o�w�?"{"_�&��џ�zbӱg�;�O�]w�n����o6�nk�e�h��;��������_J�ɣ�gZ̖�[N�|%u8������V�ݭ?h-e������S937�{(��ܥ������[�����{;��Y�|cg��������O��=�{�އ����۟��̀50;�<xz���M�3�_%�+���
���A��x����AT�w�B+0���>��zY+����,2s=LS��,Zd�l�G�����ˆh��s��c1��ڴ/�N'�5�6��$��|���'��O$��on5::�M�N���t�Q��^��	Y����ψ���B\H���X,���[٭,�-l�b��!_+�Dزﮓ����%����cی6c�6����wL�|��Ŭ}�P�عӌ�;bg��`��������wl�.�ۗ�3�B�n� Q13mda5ݒ�na���@t��g�)5��s#+����@4�M�a<ͳM�}�p�l8��������MM���/�ۿ���G�6l�pz_�>�H��������A�0]����^<�0>�_~���P|B� ���3�9%GP��F���=�~��o?���Zd�-���vZPc�E���.}��OyGd�C���>ͬ7i��h�Q`g�!'
[�k�}«���H�i�P �g��7�9���;Y�`�
i��K�Cp�\�����8�ٓ�Z�VUv������]�)R{��N��=�]�U�~��1��qSt���.V�9na��֯m$j6 ��k�pj���6e�١|!��b�HX�a�K��� ���nّ9ݶ����o��E1מ9��5�M��6v��Ѕ�&�D�r�ݖl�Y3�=n'"	��I�5_򲰜L&Or�	8�4��N��4��n��X8q�<ڟTK�TO3$K}��ԥ���^����.Se��hL�B��ǲ<2��b���/��mL�b��ަ�m�����O_�c���ϩ�*��(K��}�rcP�hn��0��Y�Bs��z>�8r�w�@�P��Lv��΢a-�c�P.��^,�ǒ�YA��"�IQ����W��m�h2-��,lzF��ּ�Y;��e�Q)�����s�s�ߘb"|�t��6=�Mcf��_!��z�u���O;"L��������h�\����n����5w�������/А��TEZ]�Qrh8$1v'
��c�~�a ��w���	�.�G�v�w�Ƭ����uz l�D iҀ�����G��"͖2��A0EM�Q4=hZ�nHu>O�24#a�����mu���Tm�=�����h�bXa��*x]����1��f򟧗�x?�$����^��D��Y����|�� �l�N����# u�@���R��$�d�mwl��v�E�nI�x���3�&(�'^��M�̛μ)��vև��z�>�%f{�	Ђ���}C�:�/7��q�;�����é?����|P�>	c�ҩp�����B��4)WLi9܂\i@(cD���ZPeS�U��O�	�x��m�k�y���w(��m��3o��g��D�$�91=j�2���x���{�3Zk�iP{���eǍ�șC��C��b�Ǉ�C�3�PL�L�R\a�XUZ�B��L���!����Q)���2p�Ͳڬq��t9�>+�>�/��N���G9따�
�x��������Ç򖕧_���(�@���.O	Yw�`�iԊ�%j�a��O��V�����{{�]�L�ӆ�p�|쁶��[M�X��ŭ������]��띧�s�`G4��a���!.���)�0Df!.4��P�\:PM���5�翁�#l4��u�XZ�����|7�T�Z�PSqh��2�z��N�K�X�E���o�n(�Rw�E��ƶ�,����C*;=Vz���K1bj���w�?�u���KK��4��f���~|ۑ���:� Q���>O���$��B읊�+Q:�������81�R�7����J�����n���⧇(�S/�1���>]�E�p$�'�@�J�F��I���J.�`L���&	gbQ�0� ��ST@Ѳ9��]<$d�e{��BfZ�m���F��}��v�eF]�:z4~�T�p�n�]w�����O��v_�h?�i����x8�ʲo�n�2O"��D)���ӝ��w���l.�����n�ޓn�'5M�{ӭ�]l��KPe���$Ə�Lϒ��	�H�$?!)�%�E�0	�[�;�X�QH�R�Tp'	���w��̾���&�
571P�fUM��a�5
=%V��A֖�xE~t`�a�eY䠟l�3Ȇ@�?:<^Y�e37�sÆ��-��2�����];���<��u�7����h��
� ~,u���BTϴmذs$�uQ�z��v��Jɝ�6�3dUkI��m�˔�v��zqA#�� 4e��f��	(QEc�F�ٗla-��`�J4�U�E�7�ĄK@lc �%շ[�-�-���-veV�\��ѡ�@>��:Y��m��8s��m��F!#t�+���V6�@���2-��PK���	��X4p�cj�d�SK��=��X	x���o���[���o�YfX��0;Kt�F*�D�\�; �"��� f���T-��'z�t� �*� ���A菑��"y\�)g�/�$���F*�����~o�)�*�r��DR7�����B8�	rЪ�w��ڑ����.��+�p�!���l1-C���[;l�aV�O�b^�L5����gV@��l�5�m�<�Fl;�u�Ӂf=m�ω��-��fͷS�<_��[�;�c�$�%@ab��aFԲ�,��X���e�Y���0J��(W(A�����T$��KD�9�S���z+(���<��޼9�baY[S�}�v�nX�H|O�!�(~S�jx��5T�$o�OR���7jU�P\W4�J}��hL�Vʎ�Y�/�mɊ���hPo��]�bz�]��B�w�Ag�C�嬑Ec��GD��E��h��;)V�Z~#��ZL���0��zQ��w����hy�t���V��X�f���T?jX�@�mTa���E��PxO|��U��nn��:?��#����F";� uT_>[55<�� �ŀ4le�0��An�Ȧ���
�k4Z���XE��Gj��o�gz+�S�80��q\=��p�gn�c�sF''�oGT��a &�H�O��M����<4)��>a'�c�P������:N\��_=`�w���>���p�א#�d8�viD���j�9u\��m�L���t0���:���.�V �1-����ܔ2�e��Od��d�
�{��PŽ�yδ;T��������\�g#��k��J�*�Eq�i��Q2�<����{�J�e��8�dW ٲ��Tۇ�i��۸������[�޸���e�$Y�V׬�D��p�880"�J��QN�H J�R,;[OO&l��1;1�.����]b�]����u�t�٢�=��ň����Ŀ=�(����4�a���\���gF�Ȟr	���T��0!��BuO�?�1Ҥ��E�~D�=b��8G�`}3|C�Y)�{%.�]w��n���Pg���dgH�SBa�k�͢l��^k�Pzkg�"g4-#��\�}�?Ӵ-��}C7\_�k���3����k�- ��}�g�[�/r�V�(��̓��y��5a��SZ g?2�0����0�+#h��,�/޽7��%���w�]ߞ�.�jZ��}�e2��ѵ�VO�&5���l׎�O҆'Y�F6������U�uY�A�� ��U�HA\Q$��c�*?��3̸��&9ԍXz`p S�i�`
Ӥ�@jJ����K[� ~y�
q<�u��f�y�4��e��Y�[�ӳ(0;�sF���\S���sU��~�~ީ���V��ް�h��YF�l�e�`w�)#�W��W��ug�5�R��D:W�s�J\�1��%Ul�-l�: ��˽�WO�>��Dڞ�*a8�"
���^�&Tۉ�X�k�>5�h�;ɴϲe���U���vX�m��|���e!�Ǣܺ�ڽ��E�w�sB�D��L�*��j��Zkҡ����.z��ƍZ�+�u��2\e��@u�j�˦�b-`���7����3n~ �� �����ª&���D��N��c�,�Y6���t%�8�I���y��\��'�d�����������'|t-%��t=-�֘g�q5��j�OuZ�*_����S]g5%�+�x׉���RR�������p��w)�srْs-��u���Z8jQ���J��ӷ�9NTe>\�^[���[e[�+7ó����1��|AV�j�]��qՏ�|�7`�e�1rn�/�K��^C�����BLvU>ٕقe�3������.��j	mJ����E��Z\�u蟇���b�������[���T�C �8�[��U}��LzM/�cȸ>������x�,�\cy��E!*ti� ��aDW����oЗ�k�mޟ�Xm����pοcR1I�r$�a#J1F�Z�t�b$����Q�v$��l�tl��S�mݭMC}��R�O��m�ȆF4Y��7����yL�*��)K%�V�'X�nCuɂJƓ큺���Z>ic2-}��飒�k�ߖ�fQ�����*kZg�,ِtS䜧-wdy�7x!�Mqdq�o�&�
.���Zau��9�\6r��mUh�F԰uڣlw.�u8�W�`5�5�z�w!G�ې�
�j��*�����zH��kn(wy++lu٧�sŷt���9���)ܻU���l��������/���&�n8�vv�v�+����~���X�>���K�@?G�hoU��r�%�hml���|.l��y�%���Yv'ԚOq������!�
�����ܿJrf;lhC����f�Ô�S]��
�~:���G,:���� �o/�	�g9m���/T����\��4\w��O�~�D7�N%�;��*]�R@�%/� �2�1��QU�	�5[�\8 ٫䲭껚_���`V�K���������S����x[��h���h#S����~-m0=uǳ�Q�2K��r��[�Z�u�i���ސ�L���P,V�������qێ7�LO���k�Z�1�Lv����l��n{�l\?��ȓ���4�݉��A0����	":�?-*��!�K�V!����Be&�R��!�]{����nh�$O���A�Pg_ϵ��XT���ృfڠ��t�z4�=^�Rm���]l��x}*��P�I�l5���px�����(�fOа�f�ϟҶg�It�������A�X�/΀��0*�v9&�:��*B_�9D]���\Q�i��FA0�X֥�+����Ͷ��E�m�vZm�F�d{3�kB���f�xc��|���{}��-[n�򪞖����N��ڈ�Wy3���ɣ�| ��i���k��C[n=�
Zx 
1� �nG��*$��ˉ�"H��-�$$����TTIA.fY�nx��H�5g&Ft�zt��[�ni�j�#4
�,����H��1K�X�=�����������q �#/�t$R�*���ٹuiK��k�H�ʲ���0�]�ake���v3�Η��Y�����w{/{�;�?�YR�0<8�:�}��'���5��WҔ�$���M:�*�9S�����I���c6V��.�.�+�kub��fi���W�HqJD�˼�(l�/�z�]�K��L�Y�;�[�8"���H-��H�5<ɩ�7jb�+p�ߚf���W�5X���{U�URL�n�s�O��+2Ij�6���>���xEVTZ��Z
�h�h<���!��٧�Δ�]�)N����K��a�[�ƟӋ�>���Z	�H|9�];��&DKAec��d,��)\��?�Èo։f�5�$E��%�-��0����o�1�h�+��yY����3���S�`��9.1IE�]'x\��Vl�W���B��E�W�딋�<.�m�6x��}_�䴧i�&�V@BB�{��aI�b��Y��^�R�bC3.{)l���3�qT�mAy�Qs�2��V! 8�*H��w;��ۺ&��U��3��OԔ���x����.��#V���zTEd��v��R��6��W�a+qce6t0�v@��_kK$�W���h���2
&�W�GI�hj�S��5�c���t1��p�1T�1M~k+����X���!0��$C!���U��L�".��VK�M\��K�=�����f%�����xmc4ɒI�IM5Rh�,���������'�ɇ�ͫ��|&����yW���{��'���a�@�"<<wF\�z=W���	
�J�*�vM3��{ꯌ䥏A�iՔ�ު��k��f6�fdSģǫhSvX'��51G;��g��W@���am�ҏ�?]{���Y���3nIK�`G(�9��LE�B�{�_Ep{U�!�q�@��9/9C�y\U�.�6j�FM�j���"����(�܂7T.�?�jЫ�Zд S�ƿ_�J��D��Dg}�Ҵ���wE��!{5�հʮU�sj�աi�r��