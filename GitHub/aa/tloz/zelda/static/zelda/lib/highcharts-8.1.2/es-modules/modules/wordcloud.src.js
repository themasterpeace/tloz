dy tr.even > .sorting_3, table.dataTable.order-column.stripe tbody tr.even > .sorting_3 {
  background-color: #fefefe;
}
table.dataTable.display tbody tr.even.selected > .sorting_1, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_1 {
  background-color: #acbad5;
}
table.dataTable.display tbody tr.even.selected > .sorting_2, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_2 {
  background-color: #aebcd6;
}
table.dataTable.display tbody tr.even.selected > .sorting_3, table.dataTable.order-column.stripe tbody tr.even.selected > .sorting_3 {
  background-color: #afbdd8;
}
table.dataTable.display tbody tr:hover > .sorting_1, table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {
  background-color: #eaeaea;
}
table.dataTable.display tbody tr:hover > .sorting_2, table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {
  background-color: #ececec;
}
table.dataTable.display tbody tr:hover > .sorting_3, table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {
  background-color: #efefef;
}
table.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
  background-color: #a2aec7;
}
table.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
  background-color: #a3b0c9;
}
table.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
  background-color: #a5b2cb;
}
table.dataTable.no-footer {
  border-bottom: 1px solid #111;
}
table.dataTable.nowrap th, table.dataTable.nowrap td {
  white-space: nowrap;
}
table.dataTable.compact thead th,
table.dataTable.compact thead td {
  padding: 4px 17px 4px 4px;
}
table.dataTable.compact tfoot th,
table.dataTable.compact tfoot td {
  padding: 4px;
}
table.dataTable.compact tbody th,
table.dataTable.compact tbody td {
  padding: 4px;
}
table.dataTable th.dt-left,
table.dataTable td.dt-left {
  text-align: left;
}
table.dataTable th.dt-center,
table.dataTable td.dt-center,
table.dataTable td.dataTables_empty {
  text-align: center;
}
table.dataTable th.dt-right,
table.dataTable td.dt-right {
  text-align: right;
}
table.dataTable th.dt-justify,
table.dataTable td.dt-justify {
  text-align: justify;
}
table.dataTable th.dt-nowrap,
table.dataTable td.dt-nowrap {
  white-space: nowrap;
}
table.dataTable thead th.dt-head-left,
table.dataTable thead td.dt-head-left,
table.dataTable tfoot th.dt-head-left,
table.dataTable tfoot td.dt-head-left {
  text-align: left;
}
table.dataTable thead th.dt-head-center,
table.dataTable thead td.dt-head-center,
table.dataTable tfoot th.dt-head-center,
table.dataTable tfoot td.dt-head-center {
  text-align: center;
}
table.dataTable thead th.dt-head-right,
table.dataTable thead td.dt-head-right,
table.dataTable tfoot th.dt-head-right,
table.dataTable tfoot td.dt-head-right {
  text-align: right;
}
table.dataTable thead th.dt-head-justify,
table.dataTable thead td.dt-head-justify,
table.dataTable tfoot th.dt-head-justify,
table.dataTable tfoot td.dt-head-justify {
  text-align: justify;
}
table.dataTable thead th.dt-head-nowrap,
table.dataTable thead td.dt-head-nowrap,
table.dataTable tfoot th.dt-head-nowrap,
table.dataTable tfoot td.dt-head-nowrap {
  white-space: nowrap;
}
table.dataTable tbody th.dt-body-left,
table.dataTable tbody td.dt-body-left {
  text-align: left;
}
table.dataTable tbody th.dt-body-center,
table.dataTable tbody td.dt-body-center {
  text-align: center;
}
table.dataTable tbody th.dt-body-right,
table.dataTable tbody td.dt-body-right {
  text-align: right;
}
table.dataTable tbody th.dt-body-justify,
table.dataTable tbody td.dt-body-justify {
  text-align: justify;
}
table.dataTable tbody th.dt-body-nowrap,
table.dataTable tbody td.dt-body-nowrap {
  white-space: nowrap;
}

table.dataTable,
table.dataTable th,
table.dataTable td {
  box-sizing: content-box;
}

/*
 * Control feature layout
 */
.dataTables_wrapper {
  position: relative;
  clear: both;
  *zoom: 1;
  zoom: 1;
}
.dataTables_wrapper .dataTables_length {
  float: left;
}
.dataTables_wrapper .dataTables_filter {
  float: right;
  text-align: right;
}
.dataTables_wrapper .dataTables_filter input {
  margin-left: 0.5em;
}
.dataTables_wrapper .dataTables_info {
  clear: both;
  float: left;
  padding-top: 0.755em;
}
.dataTables_wrapper .dataTables_paginate {
  float: right;
  text-align: right;
  padding-top: 0.25em;
}
.dataTables_wrapper .dataTables_paginate .paginate_button {
  box-sizing: border-box;
  display: inline-block;
  min-width: 1.5em;
  padding: 0.5em 1em;
  margin-left: 2px;
  text-align: center;
  text-decoration: none !important;
  cursor: pointer;
  *cursor: hand;
  color: #333 !important;
  border: 1px solid transparent;
  border-radius: 2px;
}
.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
  color: #333 !important;
  border: 1px solid #979797;
  background-color: white;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, white), color-stop(100%, #dcdcdc));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, white 0%, #dcdcdc 100%);
  /* Chrome10+,Safari5.1+ */
  background: -moz-linear-gradient(top, white 0%, #dcdcdc 100%);
  /* FF3.6+ */
  background: -ms-linear-gradient(top, white 0%, #dcdcdc 100%);
  /* IE10+ */
  background: -o-linear-gradient(top, white 0%, #dcdcdc 100%);
  /* Opera 11.10+ */
  background: linear-gradient(to bottom, white 0%, #dcdcdc 100%);
  /* W3C */
}
.dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
  cursor: default;
  color: #666 !important;
  border: 1px solid transparent;
  background: transparent;
  box-shadow: none;
}
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  color: white !important;
  border: 1px solid #111;
  background-color: #585858;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #585858), color-stop(100%, #111));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, #585858 0%, #111 100%);
  /* Chrome10+,Safari5.1+ */
  background: -moz-linear-gradient(top, #585858 0%, #111 100%);
  /* FF3.6+ */
  background: -ms-linear-gradient(top, #585858 0%, #111 100%);
  /* IE10+ */
  background: -o-linear-gradient(top, #585858 0%, #111 100%);
  /* Opera 11.10+ */
  background: linear-gradient(to bottom, #585858 0%, #111 100%);
  /* W3C */
}
.dataTables_wrapper .dataTables_paginate .paginate_button:active {
  outline: none;
  background-color: #2b2b2b;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #2b2b2b), color-stop(100%, #0c0c0c));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
  /* Chrome10+,Safari5.1+ */
  background: -moz-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
  /* FF3.6+ */
  background: -ms-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
  /* IE10+ */
  background: -o-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
  /* Opera 11.10+ */
  background: linear-gradient(to bottom, #2b2b2b 0%, #0c0c0c 100%);
  /* W3C */
  box-shadow: inset 0 0 3px #111;
}
.dataTables_wrapper .dataTables_paginate .ellipsis {
  padding: 0 1em;
}
.dataTables_wrapper .dataTables_processing {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 40px;
  margin-left: -50%;
  margin-top: -25px;
  padding-top: 20px;
  text-align: center;
  font-size: 1.2em;
  background-color: white;
  background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(25%, rgba(255, 255, 255, 0.9)), color-stop(75%, rgba(255, 255, 255, 0.9)), color-stop(100%, rgba(255, 255, 255, 0)));
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
  background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
  background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
  background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
}
.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_processing,
.dataTables_wrapper .dataTables_paginate {
  color: #333;
}
.dataTables_wrapper .dataTables_scroll {
  clear: both;
}
.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {
  *margin-top: -1px;
  -webkit-overflow-scrolling: touch;
}
.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {
  vertical-align: middle;
}
.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th > div.dataTables_sizing,
.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td > div.dataTables_sizing, .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th > div.dataTables_sizing,
.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td > div.dataTables_sizing {
  height: 0;
  overflow: hidden;
  margin: 0 !important;
  padding: 0 !important;
}
.dataTables_wrapper.no-footer .dataTables_scrollBody {
  border-bottom: 1px solid #111;
}
.dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,
.dataTables_wrapper.no-footer div.dataTables_scrollBody > table {
  border-bottom: none;
}
.dataTables_wrapper:after {
  visibility: hidden;
  display: block;
  content: "";
  clear: both;
  height: 0;
}

@media screen and (max-width: 767px) {
  .dataTables_wrapper .dataTables_info,
  .dataTables_wrapper .dataTables_paginate {
    float: none;
    text-align: center;
  }
  .dataTables_wrapper .dataTables_paginate {
    margin-top: 0.5em;
  }
}
@media screen and (max-width: 640px) {
  .dataTables_wrapper .dataTables_length,
  .dataTables_wrapper .dataTables_filter {
    float: none;
    text-align: center;
  }
  .dataTables_wrapper .dataTables_filter {
    margin-top: 0.5em;
  }
}
table.dataTable thead th div.DataTables_sort_wrapper {
  position: relative;
}
table.dataTable thead th div.DataTables_sort_wrapper span {
  position: absolute;
  top: 50%;
  margin-top: -8px;
  right: -18px;
}
table.dataTable thead th.ui-state-default,
table.dataTable tfoot th.ui-state-default {
  border-left-width: 0;
}
table.dataTable thead th.ui-state-default:first-child,
table.dataTable tfoot th.ui-state-default:first-child {
  border-left-width: 1px;
}

/*
 * Control feature layout
 */
.dataTables_wrapper .dataTables_paginate .fg-button {
  box-sizing: border-box;
  display: inline-block;
  min-width: 1.5em;
  padding: 0.5em;
  margin-left: 2px;
  text-align: center;
  text-decoration: none !important;
  cursor: pointer;
  *cursor: hand;
  border: 1px solid transparent;
}
.dataTables_wrapper .dataTables_paginate .fg-button:active {
  outline: none;
}
.dataTables_wrapper .dataTables_paginate .fg-button:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.dataTables_wrapper .dataTables_paginate .fg-button:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.dataTables_wrapper .ui-widget-header {
  font-weight: normal;
}
.dataTables_wrapper .ui-toolbar {
  padding: 8px;
}
.dataTables_wrapper.no-footer .dataTables_scrollBody {
  border-bottom: none;
}
.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_processing,
.dataTables_wrapper .dataTables_paginate {
  color: inherit;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        �   $       4                                  �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          x��vG�68��S��=MP�3E�V�i�j��N-�n�I�T 
$l��E´f�������3�<����$�}��*(ʇ��b�����������í��e�޽;ɽ�ٰ}���;H&��<i^ڽ�O��붲A�����?[�;���]�L{��<;<Nj��hwee8B��Ÿ�5������Β6K/&���n2}�e���8�������b4�'�q���/�>=��{�^�?�ְ�g�p>�g��,�M�i�^Ϻ��&��L���+�?���ݗ%��l�w���d���X8Bl�y��~�Q=KA�4O��@�y��'�y���h�Zˣ��Xm�j��`��I�������8���Aڿ�������	ܖƮ�J�^i�����,�n 7N:��z�!��]U��:prs~L^?gd��βA6N'Y;iN�����ru��&�i;5�Fr�ʝZ�bК��j���n�6���a'ɮ����G�����d�O�G}���x��:�A�^X��҆kש-}�zy��Z�]�������^��ﵓ7��6�~��������=�,w}�H���Ag����Z^��g��l]�J��G�2�&�ɣ����(�$�0�J����q6����#C2�e�A}�t�K��.����;8��o�|#MZ=�yg?^t�ٟ�d_H���?���d}� ����/\م�j�h�]&��p\[�O��$���J��p�{aqa����xx����v�h�ً��<=x�����'/�y�x��~ ��#����H�{�������F+��j#�.u7��Xi8x$�ޜ��8�k��/}���Ḯ��`cd��h������G��w��4z��lr�y����amB�{\/c��R�zm�$ ��/M�����HA>w[�����)�	��f��؀h6�X\B���B�����7���t����P͓$$鸕L�I��@3��2޺hv[I����~�B��.�����J�;$���7��kD��!V�u�wg�^��.}�����9J[�rw��^-G9 &�i�uу�\g���&�Y���r���5��oGO+{��r�⪞\L��{|��.%�w� ��{6 Zx��O�e�ⷫ�du)�2Y^K�b~n�/��E��x����������
���!&��8xX�T����Ym�0P��8I@����;8K2�^^O��Y�7V��֓�2o�!�#�z ��Ij���	l��:�G����CT��j��@!(L+�s��4QE���3��l�1��+X[��(��ߺ?�\R�l�g�X;0v.//�b^�Z9���kk+���E�5h1�ao�:DA�@���1 镪Г��n��g�t�����$}+�ސ=�e������^�
u���j�����?P{xc�˻����.�s~Q>C�G�l��d�؞�9_�,��%|���3���^�M��~��T��86&�^ɣ���uH��y:.C�+���q�]?�L�KX��r8נ����#��jmD6�������֗V���6�{����e�Y��f�?��x8�:fG㫷���q|o�����?�\��L 5>y$8��_��br�':>��u?B����?� �%r�5�S>-'{G�Z�j�̳㇒'{�,��$�4�d}ߓ1mw!|�\��r8�t	JǗ(�Z$C������:v�DC]A�}��5y��=;����R��y���΃��;k��[��ƃ~����*خ�L�,��QT�����e�
�0-�N�����x%�C$�ZW�;W��+c2�̦�LkZ��<���3 }'x~"Pr<N9��~�L[?�dr7�a
�3͉^rS��p�Y5٭+��؝�Y�C�A����"J�k[S�pB��C{m1]�o�m3��fY�0�
������׈'�!��u	L��kD*����>�"�~��k��Z��umy�5�g����m5��*��5��ka5�4t�����l��V胲�"��&�S���q�C��P���f�r~�Z@${1j�# �nk�	H;w�I���U̹7��W�>���j{ ���gg\�To�����|�ήZخ�e��ՖsI�Wvl��oֹ4���}rѫdo8���9$8�\ـX�r?I��+�A���PU*A(0�*#L�C�����lK�F�O��83U�Y�����vO�����O`p�����W���6�3��7$���G�o0P:L��sDxRӎ^I6��3���qUI�٪��z�� C���k��A{ݶ<6x�g��S_�ϪO锎�xRM��:����"L�����n��Kx( �ѝpg���A�l͒u�I���3��/[�p����iU�BD!С~�gK��b�<�,c-93ZJ��
d��6s��2M��lb���<��~�MAj�jO%���k�����O��!$p9N���d�Q�m�uWkH���s�H����V��"�b�٬�ZsL���kMg��6��ͦ�_����:Y���N@m<��#�ѨGE귱}@�b���*lx��Y�:w%��Y���洭�����l&�G������.�44��~zUS��u{��!)��⼹�T����
	,.VFB���#���.v��BB�-jJ���"?��Z��q��E�xɂ�۱�=�6�l�CX_(T�.\�����J��=�Ly2c��S���=�S�v�c�������6}n�U�
�#�aX뮾r+�Uj��i�*�D@F�؆gk�O|2��@q��"pj8��*��uKf�	ZL\�c�"Q�+B��m-�G׀kQ .��w���Wߠ�Z�-x�8��*������������� ���Jp"m�ƉT�]����s~��V�G	`� �`�t鶎��8pH�4�4$Z6ʻ=4��|8����k0'D;;õ� �
\{���6Z���Y����`?������xL��9%�,�ҍc;I'�;e����н)�����
�>ĕ�^5ط��%�E@�
)ցk���]XHh�)�p�6���:NV�;D�9lߐeJ9V��u{-�S�E�}8x�a���R{�s-������<Ve;N�@	��xG�O�ɼ2�% ���,�L~N�`T�Y�����}(tWTjw�hЀ�<ҝ�(b�i'I�����b���?�|L���#���݌1ō�D�qZ���*��u�_�O��Ʃk4tוa�$P��e��>Hu׼*3�F]Y�+��.bOcB1a�0�5,%~RK����L����c	��I�{-h���|��;�+�H�5Wa�\��ImY@�D� �� �-.��[�=)B��O�0֓�o����F�<�W�)9�Y}�mXYt�� ?�j�W����SāT�z�$���(RRB�*1t$�0�5�F�_��`Wpk���>�l`-�$l��i�NNl�Z�h؛��.>T����]�@`�,�,�+�����>���ѧ�\.����ܰ����<���/� :�B?�"�����l��������6=�2o����$��^�O :N���{��i�{�� �*P ̹.Θ�ϱ�#��Mm�9��ݪ�Vז_�؜5d�s9���s��Ә7ܴ+oشs�D.��Ǟ\׽�zo���p<��*�&>ǹ����o�j>^Yw��^��,$������EWO]c���.ē`���6�r�PBP�T0[�.E�g����������¡	`$0��so���t�f���Y �'��72�S��pL �F֥<�+�3���C�k�F~��џuO&3�[�v�ݘ�\�O9ev���|p�Fs�2 �U�J�ϰ*���B�'����TP1G
R���~С!,��\eE��f��j}��C)�zs��}��h܇î(% � @A5s[��0ُ%׭��(/���,���tYCI�
�^��
(�t7����:�6T���X<�q��i�`w��>��C�q̘��Gj�n�cvD�I�:�6�9iJ�pb��&:��P�?�0����Y�t�Z״~a�'2��5�B� ��Xd�h��7�
PET�+�\�AA���Y(���UqP6KP����,4W�AsU�()X��r�ikJ�ܬ��Uʦ�kٷpw�@D��H�p��.�:Q�[�"�@-���bp��}�6=�^P�U*��_dlZ������0Ġ�/J��}N��J������ _�ē_N�$�+X�H\�D=}�Bk
ɝ�a�}eA6'ؕL�]4�U��hZ��T�;g)|���D��p��v� l�9�[�*���9��#4sEs�h抦���M����^~�44uWP�S�g,J��S��ր!�1�g�;��Q�k���@b?S�g�к��V�Z�z 6��s��5�탮!��=�&BL!Va����羆vD�J���ˤ��>i��.�������9�f��F�l)��RIH��~	/��}��wD��Xc�n�8T�l�&��
m��Ϫ��ޘ��X�)��6i�rA�z�C�cM��H誨6��{�/ �`��BJ�q�*١0v�����`(��6����c�-d�82��lT*p��RWM�rW��CJ��M�a'y��_e�����\Ɉy��W��It���Uй����Q֮d�� ���}))�	!T2���E��ˁ���$돰�J<�ύ��c�n�8I�)l��1d�I�n[�:������pK	����W>�/�	��ћ1B0#4:�ZnN��A�#�vk���ËBk�go�6f�w���L���Iw|J@K�1Q!��zD7}��dH{V�	s�q�	���Z]m8ݤ�H�>�0I�XE�[�d�p�b��5��R�d��t�+g�oU�z���~��-�^��G�ۄ��u��&���&���q{���� P�/y�YO~�����H�{���.�KtɖG/����=z��pؤ����������\Gx�}R��7z���D��{�>��RL�s�>��~�?��-�ܰ��<yr���[����1��ֹ2�M2~��x���D�'*x\*X_]ߙ-z(E`�r䚍�ƒ0K���q�E��Dl�+&t��=r�O�j�~U��_*�«lƍ�L c1���@�qv���j�+p�.;��D��~��㍕L+�J����r�;���bN�$���J8�9SN0[)�w�j�1�3��PU>�C�O���}��fJwPz^.}���������ʥX�(�"k(�q�t��r�6���Z���ұ/����R��N�(�2�#�qQ�3%�����,r6�/%[�>W�Zm4r�M��:��O�G���&"���E����Z��jݟ_�UY�_�@p��4X���֓��[�:�ąW�(~H)b����R�d"����=,��D�
dD床�V(�7�vf,D- �N'�tɳ�x�ڋ��k8w��]��R�%*�p�����;夅^���}L��$n��==����B��((;��K�	ǘPg�!b�q\ �����>O\!Qt���3����%o��i���|c�>y���>���'8d(��0�-]����=J�ޟ�ٰwqW��!���L`v��"�_q?Y\�v����c0���/-�+�b�ѡP��C)����)�u���:�/o���p�سXM�a�&���D�%?G 8�.pT�"��c���|��8�Q�-�tܝ�+����i}�F�K�G��suV\�`d_72e�����,:�69�%O�ƻ�OL����gq��0,���jD��k��9�_2ן>	
	
}RvEhl.U6��mc��E��S5!�E�/�."�X��tq��"g���Y�kH'��� ��φ�{��2�3��� ���M�u�n��;�g�JBw��й�$��蒤TT7����ZD�_@����%�Ţ�ag	Bf"��Q��/�7C��Mt���:~,*(tZ\7X��_<��CGt��Z�P���?+k�M�D��66n0�݈��Ӑ|��.s]��](��
���d7|��-r�h��~A��8�������t褐D����5�������C|�l��cvL�t���T�Q38a�]E;��'d�\D��v_�	�B[B	 ��6X��C���Hc���K�O�o��t_�9���a�����/��t���p��7*��<&C$�՜-q����U��*V����d<�
��`� �Whu���C��ŉ�,�0aJJͧ������)���>�Qte�)�7Y]��W4E�eB���[�/�˴�s��9��i�8����������1�1$�o��s�nk�L
[왁�a#�A>�t��
�1l�ŧRI�^TW@}�j����2���� 3�=X._�,�P~m*@�3�+�DF(�v��x�(��9�,���!�����aݭ���K�&2��y�?U8�[a�ϑ�9�9Fƽ� o;��X��ҷJ��p�,z�)7�$0����+��l*��ޙ���5_뗵T��&�b�k-�e�"Б�X6Z�>�Ϫ�{P�!�6t�#��9����$�����3۽����`�M�$�順���	�c	-k=e�`���Ds���_@ĭ�����dt�-}����򲫇q����!�����:|�s����}�8|=Fu��*{�r�X�08>��`M���s]��6;����zd������7�XF2�q�f�`rS�n�X_T����u����Бc��&���F"\_;B�."�m�Z%`r4�xT0Ȯ��k���|G�?R�7����Rg��<f6���J�#|H��ae�H�f	9�T!X�t��1 |��	�1bE�xO����x�G�I�$^�R�!��R>.q�v��B`��vU�.�x����c�yW�	�W�!�]Q��c�����dcU�l�������c�\���b�٢�+rZ�>��(5��u�QV�L� ��� |J��|���L����
p
S�����Z��f�A�eCP�ck(��5	�W�@yf��/)C��g)۷9K� ��|B�	gYr].�ns�B�q�j���6d?0sG!�D��;Ш!�4ܚa���-�k���cp�0�6��2�X�d/�U֮��M�G2=5�ݩ�3��B+���3.�y���(��y��i�g�&v���i�FM���K�?5��Us�tV�P͞�j�����79��J�l�գ�sl'�B�:���T,s%��ikU���z�u��^�5��At������� �d��OU���wϮU�]��&t}�|I�$	�g 3�1�8~)m=�8��*����L��4M2�P8@o�T��4�#f���������ϸ��!7g�b(��t/��*�G�
	�L�5 �[�>�,-���)�$�^�IG�
���XfqGr�646�����>P^�}�-�rџ׺Zˬ���"n�L���iݺZ"M��5 ӂ�f��](/6]nR�L���#Glbp����T�v�6j�p�uBp`�ӽ���{�[�xR�؆Ā*2�ހ(�Ȉz36�?�˜ 82Xj	�ߖP|�I(�߀����@/jh�:�����(2~�����6U��M�үK(~�R��N������>X����n����e��Zv�@�|��;�˝^zN@���}�,�qb @�a��b�����oYn,@�>;�'$`��o��[DL}{���O���u+p�@A��ٷ%��eZl)�r�r5�n��,�W��̷�_el^;�����D3߆ZE.��є�A�U&��2�e�S�s���/n��k[��c:�m� ;ȓMImz��Ud�@��h�e�s6f����;-�̛/8̒;.�j�͙�y�^����<8݀�g����j�Y�I�E~�	���1WشPя- �c�����i�Bn ��_Ӄ��XD��� J�X����;B����C�W�7�ecD��sh&.)�jmp1���b���!�߭!��&��;J��#�����h���g�C��������5X��g���<����:� U+Fa�1���}Uo�183��E0]�&��;��8��>�J���ĵI!�^�A�5w��S4ZO>yt�=
C��\�B@x�Ml�\*���D�PF�H���H�n������˧��E�+5
�� �z2"�W�����?h��&�Fr�9B�����ݛ�{�<n���န�6Ӱ�dP0�:8��0$�����(U�Lv� �� ͖7"#����X�:�P�Q��	Veu����
�L���I�4�)���&��#uZ��'�OV+5�o��Nx\�ӢQ�-�T�"z�v�=4�1l������,r673����}"U�^W���IǀmDA7F��.�����X��En�q"�ǥ@�$��/n�����!:���j�`ۋ�H��V!xr��p��]1�m2o���d����.�PLa���'��kT��c1]�u��[6n馐\o���e�j�g��>b�x%���pz�A0���5�{,qw����}����{=\�/u�T��ļ��qar��<�B�Y�����̙!V�g;�V�1%�����XqY�Cl�6d�%,:������ L9��Ip�4e��	:��&��9��l� ;[�?��1)���I���:��}uGY��/��4��l�;�,̹Y����Y[ā�WT ΋�7�5q$l�q&���T,P<*
��l�B��[~WT���č��)X��%�&#f4��;x��-��Ȱ��z]��ita9���>C��I��I����b�%y.���@-�$l�0{���|Y;�O�������}��ד�?��h�9]^�>fq�TTc�q#��	��O��<!rk"�3�y�">?��O	NA�I](��)��ծ���u7��U��A�6�T�b1�kl�6l� �GVg�v:�vc6���µ0��+^���z�N�fb�K��O��m|��|��ʵ��X�iܡ!j�1��cx�	>��f���j�|8���vð�ޑ��Z&_>>#���"m�e$���!�z�i������VռKU�f�>�<�i���ܫ٦�ן�d��V��H+W�n�d��3J�qR�ئ�5Gui-p��d�=�ϗ:�P0}��VKr�b��ɂ7�5g2�5].�Ї����
��R=$ЩW�ɑB�����=Wa���3��3�$���R��O�k��_��������S�Ò�� ���J�7����!1��͙/]�b��
�Z�,�x�9�)"pΔ�+Q.	���|���3��"�3o�U������ vH+�z�u�WV��B����K�ˑ�/���b�)9!t��G�%:�No�+4O	��쭨	��D�]�eUy�(�?��2�����gE3v���3hr�~4��Պ�O���#��0�waC�h���P��B�|W�u�ß�Pd�	!����e����\��u?.�.a	���ߙ��d�O��L%N�����&�/��Q�v����.r�\�b�2��W��]�7�\�nn"����vO>:k����.N�� �5 e�Ŋ~�>*�%5�٘D腍�8(T��
r�3%U�qG�۝@Dx��P�I}��P�sI�f|B@y�p5�G\#���y���_����9쁦����O#u�ѹ4h�&�Z07�hN�נ�����	6xZܪ��9ֻ,�mD�wɗ]��T�.�"PPn�K�=��h�l}��DM8=�K��Ln�������B���n����Y8������|��,��pZy��á��k=��LK�7���<��ohK>��-��M��<�57�z�Nٞ��]<b:��8�Ъ`X������b�?��|ent���Bǉ:�,Pk�
d�B��iCM.ޜz�=�Q/��*�u�0R�ؼ�9�!��7�
�uG��� ��1����g���y&F����+9��A�|��<:���Zp�e�H�+h��#v��SJsE�!�c(�������/�Z�Y�GP+��;�xc�M���!��>�}�HfC��/_rׇ�� �TG-�V����l#@�s�����WR�o��*{���LS큘�%�k8*b�U��F�!X�b`�%�!31��W����l��z69�BT�T�f���̔�GkM	Ù����O��g��'�LԖK^Eۘrђ p�I��1�����F�|�K$�a�҅E�-#��љi"�k���X�|��	��Iѷ\�u�����8���ⲿ��zQ����|�p�#\��Wjw�;���5D�Z4D 70�B�VaҠ�� ըs��������
�r��]8��B#�ϵڔW��O�WXM�2�F��e�&��[rNG�ĉ���Q�7�k�/г��(s�/�mB��)0�N<�,�a$�8�� n�/:�-ēu{np��f#���v�A�xϻ�z�*�f�(A�Xw�b�l�m��#���y����}}A:q�i|xQ�=�U@�m^�c=��L����LPФ���H@�%r�͢����v!�X��rf E�k(��:�͟cb�>���Ӆ�X������ew�Zf��-���ߏ��S�$��ac��&+RN��ZA?#%4bf����B(��u.$vFt(R w8��������"񲻁�{ˬ�x���V�������Kw��(���(���F��x��O�$j,4﵊������+��j���d�o�b����xߏ���)����
2�b�b �U+�k��l�
�(`�7"ؼ�Y�M�A�vF��e\��WSzA&!�K�$��)([|dT _�@e����S)`�36H�JU���a#�Sm��?8�,�!T.�&6��H�@��>E.��]`�Uԯ��j朋Ͼ6�ۊr��"Ud:��<R���[��K˪�p�
�S5&��0�@O~����=�5�r��&*��#Kc8�+����2�p3�4
x� ����DkW���gJ>�����'�ஂK|��_�=�T�A�~A���HWW�����M��9~���n�¬(݌@P.�Fz)/<pa�΂Djy�9��۶c
�/�L��*�ym�DF��"ɳo�����g�SMal�����]�1H\h� ���iK��c�N����Y��f�5�n�̈́=f1y[�)-�KN?��?^�x�ˬ�"�Σ0���^�Dq��|Qٖ���G�F�����D���D�\� 7�8�j3�>"U� �*��Z0]ɱǕ\�폟�@�Y��	�}��ݦoWR�0�՛ہ$'b���([2��˘���bq�%�#�p/���KP`�9�G4��k>	�W��0���N<�BWT�?J���m@CU��C��8P�W�EO�uL�^-�|�^M!S`��7d����\���h���w�i����cx\�������`�3n�]%6q�`��7��J�[i��k�D��3<����!0���L����f�CnpM�d�M���^�7�7����_J�������˧�[,�Q'��^���67~K/�˯�4�o�©�/�H;bבEm#�*����;z��Ĳ��~��EpU��Z�-f����12�>=<~�ꀤ~����|���0���>����j��ؤq�K��tr����[�[�/�^�=;
] �<���/���'u���+�@�V��Pw𡜧�rd_��`��	%j��>�9a�.�����j���/�O�/�D��_��ܒ�7��cl�O��2���]�0��s��/ �O<�z���䑮d|ӵ��_��0:D�f�)�3�ole� ���v�KY��y��w�X�r�e+5��Ε�XB����qe��i��	&VI����gR+������FgŶ/�ߵ�(��o&��!�Erf��_ޔA��o7����P �W�ȹw0ܰ��F���1f�I�l;�#B��E�+>�a�zYёS�p[e�p�D��.����]J[�gD7�_��Ձ_7z_�-��"�c�n�
�T�˄�L�#C]|	3�ڨ��Y�:U����0��A~�}��0c��U��Ìa�<y��?*s����aL����_���[vJ�%�"1�R��PjFh	��;��V���IS�����