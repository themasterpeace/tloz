<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M592.604 208.244C559.735 192.836 515.777 184 472 184H186.327c-4.952-6.555-10.585-11.978-16.72-16H376C229.157 137.747 219.403 32 96.003 32H96v128H80V32c-26.51 0-48 28.654-48 64v64c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v16c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v64c0 35.346 21.49 64 48 64V352h16v128h.003c123.4 0 133.154-105.747 279.997-136H169.606c6.135-4.022 11.768-9.445 16.72-16H472c43.777 0 87.735-8.836 120.604-24.244C622.282 289.845 640 271.992 640 256s-17.718-33.845-47.396-47.756zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.909 0 31.942 80 0 80z"/></svg>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            U
    ��b�  �                   @   sd   d dl Z d dlmZ d dlmZ d dlmZ d dlmZ d dl	m
Z
 d dlmZ G dd	� d	e�ZdS )
�    N)�template)�formset_factory)�reverse_lazy)�FormView)�
Ingresorcp)�RcpFormc                       s(   e Zd ZdZee�Z� fdd�Z�  ZS )�
RcpFormsetzrcp/ingreso_rcp.htmlc                    s&   |D ]}|� � r|��  qt� �|�S )N)�is_valid�save�super�
form_valid)�self�form�f��	__class__� �<C:\Users\MASTERPEACE\Desktop\masterpeace\tloz\rcp\formset.pyr      s    
zRcpFormset.form_valid)	�__name__�
__module__�__qualname__�template_namer   r   �
form_classr   �__classcell__r   r   r   r   r   	   s   r   )�imp�rer   Zdjango.formsr   �django.urlsr   �django.views.generic.editr   Z
rcp.modelsr   Z	rcp.formsr   r   r   r   r   r   �<module>   s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        x�[�r�Ȓ�O�Ы5�6�r�S� � EQ-K�č��H�(��<1�>�,.r���<L�t�!��̬̓KU��������'G'��_;Oy�(�����;w�$��c�_��|��K��x��8��;�;�b���q���c�dw��b6\`����s��w{��v�s���q��o�v�[F�u��ݶs��q�z7qn��hq�C&M>�q�HtI�$�3~���W���D."N��7q��h��-���g��:7�$وE�t;�C<����>�v�S�_c�jM8@����S6H�n��&�)��Z�W�o����F)R����xt���Ię�@��#R����J�W�~k� ���r]�P��i��m�K���<J�0M�9�k����[o�����H��_��+�`���N#��� �OERKKE��)1~!8=Yۣ�}cc.:w;"�x���}��״~��"��{�P�#��W{��lF�5��E��k1�Q�3�=�G�Ճ�b�Gow�y����{�vg����̽�v�t�)Կh��t�0�'�˃׀��~�������=����.a/@��\)�
��x9?UGǌT�m����e�R��@�]��|���ԥ!�ɾ���˧��(\�<����Q�xHT�x�R�� U�lԃC^�)�8
=��GJ�{(��&HN��-L�v�S$�{:�[-��>o�'��n������K�`��9��g��9i�W�M�'���������$�#\���!��g���N[.&OesM�m��of�ȚR
|YL%w�t̆ P��h�x�2�y�qYc��m�})9�j�IF5�Ն�O~&$P{M�3I��Ηf9kq0b:u�x�^rF�;���+jN"���'F�����%g�sx��@������1ȩp-�DzaUȖJ�q1 ��g���P��}i�(d�`-�~ vc�ADA��ZF�`&����-יGۑ?�����9,Y��)��f�S��B�L�y��#43&�r�m�0q�^sę�w�.پɱ�HpqH�4����	l�Ll�$��� �w�DjJ"�w�4���O,�~�Is���&����$�t�Z��N?p�͋�p'Ƙy4�^�/~��»օ[���͋ �h��(U�j>�Ł����l��t@	K�mK� Z��p�QT7�0�	�x�R� ����h�����Bg+1z§� �������j'}�Y@}�2D��5"��lUQ���������~�_T�uT���6'�e�Em�&3:���RSJJ�h,BUP�Uc�k}j���4T�.�{��lua%�݌V¼����B8�
tK�J
�2��Y&�g��)���w��n����v\�)?��(u*�o�}`�2cЈ��E�wi܄!YVY�A$7�����kNJ\�P5nc��d┎��9@^=�sV$��T�|����Rw�x���o�)��WV�J���4�����Q��PXz�C�A�QS���ewk�OR8��)r�L�B�=�-D��|�3({�0��L�KF�B�w�Aб��
��%��6((�E���r�HՊ��$��(�b�O�GyNM:�eY�@������B�֢fo(tB�_���*@�/R����w4��r�AZ -�Ym��Ȏ-|��Q@.�O�9!�!Eb���J)~c碀�v����̢}K��'"\��,�Qv�ި�~b��5փ7�`l�K���zqm��!�#ځ�\y�T��U�����E�:F��-l�b��A�R4a�L���N���p����5?��摃�`IN��s��y��FVKeDW�EP+�Il"ԖoK>��I�t]c����hiŦIq4M�5 Su���W�F��Z	P��9j�y�ωFe�C
 B]ۧ��j u�$z��X�ן�����ff��Ʈ�G�.#Y�d����@��8"���J��x��������gٴψKu���=#d�Ȥ�;#\��S��`$�o��� V�H.�Ԣ�ZݿAMȢ��W�{VfL�].�{)c �C�yF��W,4��u	��`���8�#��j��d�>��QG���Xc�ݩ4��>^t��9�󂬅�y�mף���aԱ�j�2�m}u4%&P1���w�p&��I�a/%!����b�<LB�&��!c_�.��.�P��u��Q���T�k��bOt
t��E��i�p�9�^ɵ?���WV�C�O�ן�_Fs�&��FE�Y�Xh��g�3�W�l)<$��=2dz\�Km���Q���d���:��ov��a�X?����-�/;�a��ld��E�i�'{:��J�
Nl�XC����N,���i��*8Z���l���j����;��o�r�1Z�36Ke����hC�|n`�˃��h@8��%���ؑ��R��b%�8��bJ�֤��Iʍ�BZrq�ŧ:VTE���d�:G�jd�Q�g�Z*E4������HUd�ٖ��,�r��_���I�#��TE�v�R��6�u��bm���������h� �V��;w>��ݠr�(����<D�Q;�*�R��2�b�2���9�L���F�[�b��!e[�C
�7�����B��AlSj�U��4H\��G�lɝ�>K7}��� AH���ߘ�~E���j�1P��l�X��C��N�n8oZ�,���۲4s�t��V��3hzE&4�@ԩ���]��t>ES5	 /c�}-7d��� )q�	��1���	l�!���:'I��fo��"��Rc�� �$.C�B0�G��qh���?pdK�����x�ׂjhJ��Ss�":���#�i��Qc)`?���y�AKE��U��lJ�E���٬����B�U7�?��	�����I ���j:VQwB��Z���V�Ke�ޓd�}����,.�Y�:1a,~�~./���أ� ���'cH������g�|��E\�B٧������^5�#Ԣ���Ŗkz0��( �=ζ�Ф�M��^�N�Zy������=v�jgվ��"x� �M�$V�ߛ���02���-QkF���'	�j�9R��� ���W���(1�|�[O5�6r<���*)Ǣ��Њ��ʥB����2��n\���P��T��5E=�Mz�a�xlZ�*_�9�h�x�,[�s�:���4��e�-�V�����F�+��n~��s��$�iWΉn@B��Dk��$�^��U=_�tAwT���ۜm���}�����߼�a:>�H/�@�vh�$��	C����5�tȭ�U�x�zc,�p��_$��E*�yk���5�~�F�':���I�ı���k,�8��;�Դ��֙�Ni�*×�
����:ez�����K�.��A�͡1/����y��c���"$iRoY4DD�x��`_�Ch�;h��(�iFc���:���X���Q�LGVO��t��&��	�9�b��i]Ҽ�#Nok��(��&܄RYU v[R�yVR��[IC;N��}��T|)�D�L���+$�zah��j n�[)?�����#%w=)D����уڴ�p��i#t�������))�Zg�nw�(Ģ���#V񐤸���Z�<�]����/���l�c ���� ��l����M�R�?����8AĈ��J�W�����@�[�a޶m8p�A�x��כ�v�9+;W���c�)TߟkR��*\f�֑v��tZC�Ż���(���Ϛ(7��#�ɏ-L߬��:�A�AN�/�Fh@}	�n�b3f�����lP����ǈ�7S_j6
z'�=܆��ZPhC�~v��g2��s�O,�|٬$j�����k�T���0~ae�Z��IQ�̈́���,�Q�=�������i�s�������(ws�\�W�@b���m�#���O�]Ot�y5������1y_u(��D���q�¯s���/�8�J�t����8���F带L����׶u�0.urAf���:�&Y+�Ԭ���Zv�d�q�l�ĚP���5Tx�T���N� �u-��M�+��ͫ�n���!����g��P�	�		�.�Z���zJ�JΎ��@�b�d�p���r��Կbّ�C��:.1	 ��FM��Q�7�U��ǈQ�j�Z�y��P�l��F��6p/�}x �Q�w���+B>�X��-<C��b-��NV~�[t��u4v���	LDZWLc$gF0R]̮����V����W+�J��I�Jp�dt�V�Ά��{ I�֤Y�o��+O֗Y�/M�v`���:sP�^��)��w�B�4�~���b��RT�-�Vj�׈91�ZGn��3�,%��	��7�>�a
�Ϯ�lW�RG������c���v;�q_���r��O�{$�P�<�/=�\�>��b+��R�XF3:�?��wS1� uɹ���f�Ԏƹ��5��5b��&�8e��m��U�	EA�:�c4���壸d�����.�.�X�x�b=�b�l��C:I_3�̆�P��C�QE�{��h
W=AB_lK�T�ܦ�o�d@/��9�P�*VS�lq��I�� w��V4pq��$��� ���F@�X9��ܵ��ɋT���������'}h�n���%��p�fA�ϑAI�,EC>b;]^*���H?mN�v�a؞&�����D\%����)
NW���=��
��������L/6��kK�0~ےG Լ�K�g3 �ݼ.spl�x���n0
�x�5M��k=<m�uE�q��Z$+}��!�2,�p�3�1� )�~ ��GMD�0@�/�&ϑJU7O�s� b��X�<.$@�&��<h�u��Ob�/���@}܀#�]��㍞5#䈮�+��HîϾ��Ԙ��F���Q��Zh����rI������\��I�
z���a�*�M��G
�=��M ��>�,�O��l�ۑj�<��h�լ��WB�f�"�����|@GT�ƻ��H"�ھ/�w�#�t:4��RD�!�MbXǋ��P<85�	���i|�������ء�w��nh�	�f�p����,|��J����G�!6���ә��3��Y4ԡ"^%AD����
�g] �@q��G�t#�|z9���C<Dp�0H8����)^��Y8D�_fbe[3-���vPn�2.�:����Bl�	�������ן��)Q"tp�#�3��K����P�Z��1��X�J�׈������#m.�Gѳ��f���Q�����g��f9$&�U�fG�*I�����Έ�/��?�!��|�9><��7�/�>V�����,�Z�]6X��+�L��G|ھ�����j���m~�/��Mo�l��`�Y���z��W���2��+e���l9��
������l�y��W�<��d�o�'�����@�������[f�q�̧x�no����C�y�U�j*��2R+g��~^�u^���˫K�݉��>y���b��������EU���^,�i�?��v�⨧l�g����3�Xh�wUI�'�l(�,K�Z�+f���x����-�����;�~������է�������O����i���Hnz�U�,��s
CK�B�7o=��۱//y��>�QWn�*j���/���V��1����5��bf�_����	���:�d�/Œb�s��GV�m�=K�0�>.�f~W».V��e�Bs��x�f��ev(��b&��W�r��!��ۦY���l�dTf6+�׎�����WV�db���oU6[LV�qr�{�"{�;��# {�B�L(H}C�T"Q&�T������E6��pS��/�c�p����E��#�5-��E�Ħg��4e�W���U��,=����\���9/^�Ɇ[(C����+�ݘ���t^.Hj��q�H��I��b-f�~r\�1���pY�l��㛎q�ʩR_��*n�v��A�_�u��k?1O���ey9G���V1D�o�-�n3�1x�*�%ΖY�*��%��0��c���b Y��Eg���� 
��BJ����T,��,X��eչ����T^ce��+f--Y��Y?�Hc�R4̗�*��¢���y�X��bv��
��n��Y>X�/i�E�����a�i85-����`�_����;�����n�@                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // stylelint-disable at-rule-no-vendor-prefix, declaration-no-important, selector-no-qualifying-type, property-no-vendor-prefix

// Reboot
//
// Normalization of HTML elements, manually forked from Normalize.css to remove
// styles targeting irrelevant browsers while applying new styles.
//
// Normalize is licensed MIT. https://github.com/necolas/normalize.css


// Document
//
// 1. Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
// 2. Change the default font family in all browsers.
// 3. Correct the line height in all browsers.
// 4. Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS.
// 5. Change the default tap highlight to be completely transparent in iOS.

*,
*::before,
*::after {
  box-sizing: border-box; // 1
}

html {
  font-family: sans-serif; // 2
  line-height: 1.15; // 3
  -webkit-text-size-adjust: 100%; // 4
  -webkit-tap-highlight-color: rgba($black, 0); // 5
}

// Shim for "new" HTML5 structural elements to display correctly (IE10, older browsers)
// TODO: remove in v5
// stylelint-disable-next-line selector-list-comma-newline-after
article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
  display: block;
}

// Body
//
// 1. Remove the margin in all browsers.
// 2. As a best practice, apply a default `background-color`.
// 3. Set an explicit initial text-align value so that we can later use
//    the `inherit` value on things like `<th>` elements.

body {
  margin: 0; // 1
  font-family: $font-family-base;
  @include font-size($font-size-base);
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: $body-color;
  text-align: left; // 3
  background-color: $body-bg; // 2
}

// Suppress the focus outline on elements that cannot be accessed via keyboard.
// This prevents an unwanted focus outline from appearing around elements that
// might still respond to pointer events.
//
// Credit: https://github.com/suitcss/base
[tabindex="-1"]:focus {
  outline: 0 !important;
}


// Content grouping
//
// 1. Add the correct box sizing in Firefox.
// 2. Show the overflow in Edge and IE.

hr {
  box-sizing: content-box; // 1
  height: 0; // 1
  overflow: visible; // 2
}


//
// Typography
//

// Remove top margins from headings
//
// By default, `<h1>`-`<h6>` all receive top and bottom margins. We nuke the top
// margin for easier control within type scales as it avoids margin collapsing.
// stylelint-disable-next-line selector-list-comma-newline-after
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: $headings-margin-bottom;
}

// Reset margins on paragraphs
//
// Similarly, the top margin on `<p>`s get reset. However, we also reset the
// bottom margin to use `rem` units instead of `em`.
p {
  margin-top: 0;
  margin-bottom: $paragraph-margin-bottom;
}

// Abbreviations
//
// 1. Duplicate behavior to the data-* attribute for our tooltip plugin
// 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
// 3. Add explicit cursor to indicate changed behavior.
// 4. Remove the bottom border in Firefox 39-.
// 5. Prevent the text-decoration to be skipped.

abbr[title],
abbr[data-original-title] { // 1
  text-decoration: underline; // 2
  text-decoration: underline dotted; // 2
  cursor: help; // 3
  border-bottom: 0; // 4
  text-decoration-skip-ink: none; // 5
}

address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

dt {
  font-weight: $dt-font-weight;
}

dd {
  margin-bottom: .5rem;
  margin-left: 0; // Undo browser default
}

blockquote {
  margin: 0 0 1rem;
}

b,
strong {
  font-weight: $font-weight-bolder; // Add the correct font weight in Chrome, Edge, and Safari
}

small {
  @include font-size(80%); // Add the correct font size in all browsers
}

//
// Prevent `sub` and `sup` elements from affecting the line height in
// all browsers.
//

sub,
sup {
  position: relative;
  @include font-size(75%);
  line-height: 0;
  vertical-align: baseline;
}

sub { bottom: -.25em; }
sup { top: -.5em; }


//
// Links
//

a {
  color: $link-color;
  text-decoration: $link-decoration;
  background-color: transparent; // Remove the gray background on active links in IE 10.

  @include hover {
    color: $link-hover-color;
    text-decoration: $link-hover-decoration;
  }
}

// And undo these styles for placeholder links/named anchors (without href)
// which have not been made explicitly keyboard-focusable (without tabindex).
// It would be more straightforward to just use a[href] in previous block, but that
// causes specificity issues in many other styles that are too complex to fix.
// See https://github.com/twbs/bootstrap/issues/19402

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;

  @include hover-focus {
    color: inherit;
    text-decoration: none;
  }

  &:focus {
    outline: 0;
  }
}


//
// Code
//

pre,
code,
kbd,
samp {
  font-family: $font-family-monospace;
  @include font-size(1em); // Correct the odd `em` font sizing in all browsers.
}

pre {
  // Remove browser default top margin
  margin-top: 0;
  // Reset browser default of `1em` to use `rem`s
  margin-bottom: 1rem;
  // Don't allow content to break outside
  overflow: auto;
}


//
// Figures
//

figure {
  // Apply a consistent margin strategy (matches our type styles).
  margin: 0 0 1rem;
}


//
// Images and content
//

img {
  vertical-align: middle;
  border-style: none; // Remove the border on images inside links in IE 10-.
}

svg {
  // Workaround for the SVG overflow bug in IE10/11 is still required.
  // See https://github.com/twbs/bootstrap/issues/26878
  overflow: hidden;
  vertical-align: middle;
}


//
// Tables
//

table {
  border-collapse: collapse; // Prevent double borders
}

caption {
  padding-top: $table-cell-padding;
  padding-bottom: $table-cell-padding;
  color: $table-caption-color;
  text-align: left;
  caption-side: bottom;
}

th {
  // Matches default `<td>` alignment by inheriting from the `<body>`, or the
  // closest parent with a set `text-align`.
  text-align: inherit;
}


//
// Forms
//

label {
  // Allow labels to use `margin` for spacing.
  display: inline-block;
  margin-bottom: $label-margin-bottom;
}

// Remove the default `border-radius` that macOS Chrome adds.
//
// Details at https://github.com/twbs/bootstrap/issues/24093
button {
  // stylelint-disable-next-line property-blacklist
  border-radius: 0;
}

// Work around a Firefox/IE bug where the transparent `button` background
// results in a loss of the default `button` focus styles.
//
// Credit: https://github.com/suitcss/base/
button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0; // Remove the margin in Firefox and Safari
  font-family: inherit;
  @include font-size(inherit);
  line-height: inherit;
}

button,
input {
  overflow: visible; // Show the overflow in Edge
}

button,
select {
  text-transform: none; // Remove the inheritance of text transform in Firefox
}

// Remove the inheritance of word-wrap in Safari.
//
// Details at https://github.com/twbs/bootstrap/issues/24990
select {
  word-wrap: normal;
}


// 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
//    controls in Android 4.
// 2. Correct the inability to style clickable types in iOS and Safari.
button,
[type="button"], // 1
[type="reset"],
[type="submit"] {
  -webkit-appearance: button; // 2
}

// Opinionated: add "hand" cursor to non-disabled button elements.
@if $enable-pointer-cursor-for-buttons {
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    &:not(:disabled) {
      cursor: pointer;
    }
  }
}

// Remove inner border and padding from Firefox, but don't restore the outline like Normalize.
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type="radio"],
input[type="checkbox"] {
  box-sizing: border-box; // 1. Add the correct box sizing in IE 10-
  padding: 0; // 2. Remove the padding in IE 10-
}


input[type="date"],
input[type="time"],
input[type="datetime-local"],
input[type="month"] {
  // Remove the default appearance of temporal inputs to avoid a Mobile Safari
  // bug where setting a custom line-height prevents text from being vertically
  // centered within the input.
  // See https://bugs.webkit.org/show_bug.cgi?id=139848
  // and https://github.com/twbs/bootstrap/issues/11266
  -webkit-appearance: listbox;
}

textarea {
  overflow: auto; // Remove the default vertical scrollbar in IE.
  // Textareas should really only resize vertically so they don't break their (horizontal) containers.
  resize: vertical;
}

fieldset {
  // Browsers set a default `min-width: min-content;` on fieldsets,
  // unlike e.g. `<div>`s, which have `min-width: 0;` by default.
  // So we reset that to ensure fieldsets behave more like a standard block element.
  // See https://github.com/twbs/bootstrap/issues/12359
  // and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements
  min-width: 0;
  // Reset the default outline behavior of fieldsets so they don't affect page layout.
  padding: 0;
  margin: 0;
  border: 0;
}

// 1. Correct the text wrapping in Edge and IE.
// 2. Correct the color inheritance from `fieldset` elements in IE.
legend {
  display: block;
  width: 100%;
  max-width: 100%; // 1
  padding: 0;
  margin-bottom: .5rem;
  @include font-size(1.5rem);
  line-height: inherit;
  color: inherit; // 2
  white-space: normal; // 1
}

progress {
  vertical-align: baseline; // Add the correct vertical alignment in Chrome, Firefox, and Opera.
}

// Correct the cursor style of increment and decrement buttons in Chrome.
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  // This overrides the extra rounded corners on search inputs in iOS so that our
  // `.form-control` class can properly style them. Note that this cannot simply
  // be added to `.form-control` as it's not specific enough. For details, see
  // https://github.com/twbs/bootstrap/issues/11586.
  outline-offset: -2px; // 2. Correct the outline style in Safari.
  -webkit-appearance: none;
}

//
// Remove the inner padding in Chrome and Safari on macOS.
//

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

//
// 1. Correct the inability to style clickable types in iOS and Safari.
// 2. Change font properties to `inherit` in Safari.
//

::-webkit-file-upload-button {
  font: inherit; // 2
  -webkit-appearance: button; // 1
}

//
// Correct element displays
//

output {
  display: inline-block;
}

summary {
  display: list-item; // Add the correct display in all browsers
  cursor: pointer;
}

template {
  display: none; // Add the correct display in IE
}

// Always hide an element with the `hidden` HTML attribute (from PureCSS).
// Needed for proper display in IE 10-.
[hidden] {
  display: none !important;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            s e   z n o v u   s p u s t i l a   s y n c h r o n i z a c e .            O n e D r i v e % 1 ! s ! 
 Z p r a c o v � v � n �   z m n 4 O n e D r i v e % 1 ! s ! 
 Z p r a c o v � v �   s e   t e n t o   p o e t   z m n :   % 2 ! s ! . " O n e D r i v e % 1 ! s ! 
 Z p r a c o v � v �   s e   z m n a .    O n e D r i v e % 1 ! s ! 
 A k t u a l i z o v a n �          M i c r o s o f t   O n e D r i v e   H Z k o n t r o l u j t e ,   z d a   j e   s l o ~k a   O n e D r i v e   d o s t u p n � ,   a   s p u s et e   O n e D r i v e   z n o v u . H S l o ~k u   O n e D r i v e   s e   n e p o v e d l o   n a j � t ,   p r o t o ~e   n e n �   d o s t u p n �   d a n �   j e d n o t k a . . P Yi p o j t e   p r o s � m   d i s k   a   s p u s et e   O n e D r i v e   z n o v u .  V � t �   v � s   O n e D r i v e . � O n e D r i v e   j e   v a ae   b e z p l a t n �   o n l i n e   � l o ~i at .   K d y ~  s i   d o   s l o ~k y   O n e D r i v e   p Yi d � t e   s o u b o r y ,   d o s t a n e t e   s e   k   n i m   z   t e l e f o n u ,   t a b l e t u   n e b o   j i n � c h   z a Y� z e n � .  k B  M B  G B  B     PA                      5 V a ae   k n i h o v n a   % 1 ! s !   s e   n a   t o m t o   w e b u   z n o v u   v y t v o Yi l a . [ K l i k n t e   n a   Z m n i t   k o n f i g u r a c i   O n e D r i v u   a   z n o v u   s i   n a s t a v t e   t u t o   k n i h o v n u   n a   s v � m   p o � t a i . E O n e D r i v e % 1 ! s ! 
 N k t e r �   s o u b o r y   j s o u   m o c   v e l k � ,   t a k ~e   s e   n e d a j �   n a h r � t . H N k t e r �   s o u b o r y   v   � l o ~i at i   % 1 ! s !   j s o u   m o c   v e l k � ,   t a k ~e   s e   n e d a j �   n a h r � t . Q P Ye d   n a h r � v � n � m   s o u b o r o  s e   u j i s t t e ,   ~e   j e j i c h   v e l i k o s t   n e p Ye k r a u j e   % 1 ! s !   % 2 ! s ! . 2 Z � s t u p c e   s o u b o r o  a p l i k a c e   O n e N o t e   n e l z e   o d s t r a n i t . � Z � s t u p c e   s o u b o r o  O n e N o t e   s e   z   v a a�   s l o ~k y   % 1 ! s !   n e d a j �   o d s t r a n i t .   K l i k n u t � m   p Ye j d e t e   n a   w e b   O n e D r i v e . c o m ,   o d k u d   j e   m o~e t e   o d s t r a n i t .  A k t u a l i z o v a t   a p l i k a c i   O n e D r i v e  S o u b o r   O n e N o t u   n e j d e   p Ye s u n o u t . v Z � s t u p c e   o n e n o t o v � c h   s o u b o r o  n e j d e   p Ye s o u v a t   m e z i   w e b y .   K l i k n u t � m   p Ye j d t e   n a   O n e D r i v e . c o m   a   p Ye s u Ht e   z � s t u p c e   z   w e b u . D % 1 ! s !   n e j d e   p Ye s u n o u t   z   w e b u   % 2 ! s ! .   P o l o ~k a   s e   v r � t i l a   n a   w e b   % 3 ! s ! .    P o t � ~e   p Yi   a k t u a l i z a c i   O n e D r i v e � J e   n � m   l � t o .   P o k u s i l i   j s m e   s e   n k o l i k r � t   a k t u a l i z o v a t   a p l i k a c i   O n e D r i v e ,   a v aa k   n e � s p an .   K l i k n u t � m   s e m   n a i n s t a l u j t e   n e j n o v j a�   v e r z i   r u n . C V a ai   s l o ~k u   O n e D r i v e   n e l z e   v y t v o Yi t   v   u m � s t n � ,   k t e r �   j s t e   z v o l i l i .  V y b e r t e   j i n �   u m � s t n � . I V   t o m t o   u m � s t n �   u ~  j e   j i n �   s l o ~k a   O n e D r i v e .   Z v o l t e   p r o s � m   j i n �   u m � s t n � . k V y b e r t e   u m � s t n � .   N o v �   s l o ~k a   O n e D r i v e   b u d e   v y t v o Ye n a   v e   s l o ~c e ,   k t e r o u   z v o l � t e ,   p o k u d   t a t o   j i ~  n e e x i s t u j e .   V a ae   s l o ~k a   % 1 ! s !   j e   t a d y :   % 2 ! s !  B y l a   n a i n s t a l o v � n a   a k t u a l i z a c e . 9 A p l i k a c e   O n e D r i v e   b y l a   a k t u a l i z o v � n a   n a   n e j n o v j a�   v e r z i . PA+ U m � s t n �   v a a�   s l o ~k y   O n e D r i v e   n e l z e   n a l � z t . � Z k o n t r o l u j t e   p r o s � m ,   j e s t l i   t a t o   s l o ~k a   s t � l e   e x i s t u j e   v   u v e d e n � m   u m � s t n � ,   k l i k n t e   n a   Z k u s i t   z n o v u   n e b o   Z m n i t   k o n f i g u r a c i   O n e D r i v u   a   z n o v u   s i   n a s t a v t e   s l o ~k u   O n e D r i v e . 0 V e   v a a�   s l o ~c e   O n e D r i v e   j e   p Y� l i a  m n o h o   s o u b o r o. L O d e b e r t e   p r o s � m   s o u b o r y   z e   s l o ~k y   O n e D r i v e   n e b o   z m Ht e   k o n f i g u r a c i   O n e D r i v u .  Z m n i t   k o n f i g u r a c i   O n e D r i v u  T a d y   j e   v a ae   s l o ~k a   % 1 ! s !  Z k u s i t   z n o v u  U k o n i t   O n e D r i v e � N e m u s � t e   s y n c h r o n i z o v a t   v ae c h n o ,   c o   m � t e   n a   O n e D r i v e .   O t e v Ye t e   n a b � d k u   N a s t a v e n �   a   z a d e j t e ,   c o   s e   b u d e   s y n c h r o n i z o v a t   s   t � m t o   p o � t a e m .  Z v o l i t   u m � s t n �   n a   O n e D r i v u ( D o al o   k   p r o b l � m u   s   p Yi p o j e n � m   k   O n e D r i v u 5 Z k o n t r o l u j t e   p Yi p o j e n �   k   i n t e r n e t u   a   z k u s t e   t o   z n o v u .  N e p o v e d l o   s e   v � s   p Yi h l � s i t .  Z k u s t e   z n o v u   z a   n k o l i k   m i n u t . \ O m l o u v � m e   s e ,   a l e   s   O n e D r i v e m   b y l y   n j a k �   p r o b l � m y .   Z k u s t e   t o   p r o s � m   z n o v u   z a   n k o l i k   m i n u t . � D o al o   k   p r o b l � m u   s   v a a� m   � t e m .   P o k u d   c h c e t e   z j i s t i t ,   j a k   h o   m o~e t e   v y Ye ai t ,   p Ye j d t e   n a   O n e D r i v e . c o m   a   p Yi h l a s t e   s e .   A ~  p r o b l � m   o d s t r a n � t e ,   z k u s t e   t o   z n o v u . PA= Z m Ht e   n a s t a v e n �   p r o h l � ~e e   p r o   p r � c i   o n l i n e   a   o p a k u j t e   a k c i .  Z k u s t e   z n o v u .  Z k u s t e   z n o v u   z a   n k o l i k   m i n u t . ) J e   n � m   l � t o .   D o al o   k   p o t � ~� m   s e   O n e D r i v e . 5 N e p o v e d l o   s e   n � m   n a j � t   s l o ~k u   % 1 ! s !   v   � l o ~i at i   % 2 ! s ! .  O n e D r i v e   j e   s p u at n . _ P Yi d e j t e   s o u b o r y   n a   O n e D r i v e   a   b u d e t e   m � t   k   d i s p o z i c i   n e j a k t u � l n j a�   k o p i e ,   a e  u ~  j s t e   k d e k o l i . . O n e D r i v e   n e l z e   s p u s t i t   s   p l n � m i   p r � v y   s p r � v c e . & R e s t a r t u j t e   O n e D r i v e   b e z   p r � v   s p r � v c e . - S l o ~k a   O n e D r i v e   u ~  v   t o m t o   p o � t a i   e x i s t u j e . � P o k u d   s e   p Yi p o j u j e t e   s t e j n � m   � t e m   O n e D r i v u   j a k o   d Y� v e ,   z v o l t e   P o u ~� t   t u t o   s l o ~k u .   V   o p a n � m   p Y� p a d   z a d e j t e   n o v �   u m � s t n � ,   a b y s t e   p Ye d e al i   k o m b i n o v � n �   s o u b o r o  z e   d v o u   r oz n � c h   � t o.    Z v o l i t   n o v o u   s l o ~k u  P o u ~� t   t u t o   s l o ~k u ` Z v o l t e   Z k u s i t   z n o v u   a   p Yi h l a s t e   s e   k   O n e D r i v u   � t e m   M i c r o s o f t ,   k t e r �   v   t o m t o   p o � t a i   p o u ~� v � t e . * N e m o h l i   j s m e   v � m   v y t v o Yi t   s l o ~k u   O n e D r i v e . Z N e j d e   v y t v o Yi t   v   m � s t ,   k t e r �   v y ~a d u j e   v � a  s p r � v c e :   % 1 ! s ! . 
 
 P o ~� d e j t e   o   p o m o c   I T   o d d l e n � . PA= V a ai   s l o ~k u   O n e D r i v e   n e j d e   v y t v o Yi t   v   t o m t o   u m � s t n � :   % 1 ! s ! .   z V a ai   s l o ~k u   % 1 ! s !   n e j d e   v y t v o Yi t   v   u m � s t n �   p o ~a d o v a n � m   s p r � v c e m :   % 2 ! s !   
 P o k u d   p o t Ye b u j e t e   p o m o c ,   k o n t a k t u j t e   I T   o d d l e n � .  Z m n i t   u m � s t n � A V :   % 1 ! s !   j s m e   z j i s t i l i   j i n o u   s l o ~k u   O n e D r i v u ,   n e ~  j s m e   o e k � v a l i . � Z k o n t r o l u j t e   p r o s � m ,   ~e   j e   t a t o   s l o ~k a   s t e j n �   j a k o   s l o ~k a ,   k t e r �   s e   p ov o d n   n a k o n f i g u r o v a l a   s   t � m t o   � t e m ,   a   k l i k n t e   n a   Z k u s i t   z n o v u   n e b o   k l i k n t e   n a   Z m n i t   k o n f i g u r a c i   O n e D r i v u   a   z n o v u   s i   n a s t a v t e   s l o ~k u   O n e D r i v e . I K l i k n t e   p r o s � m   n a   N a s t a v i t   O n e D r i v e   a   z n o v u   s i   n a s t a v t e   s l o ~k u   O n e D r i v e .  V y b r a t   s l o ~k u   2 K l i k n u t � m   n a   t l a � t k o   O K   s l u ~b u   O n e D r i v e   u k o n � t e . , O z n � m i t   p r o b l � m   v   z � j m u   v y l e p ao v � n �   O n e D r i v e )J e   n � m   l � t o ,   ~e   j s t e   z j i s t i l i   p r o b l � m   s e   s l u ~b o u   O n e D r i v e .   K l i k n u t � m   n a   t l a � t k o   P Ye j � t   n a   f � r a   p Ye j d e t e   n a   f � r a   s l u ~b y   O n e D r i v e   a   a u t o m a t i c k y   o d e al e t e   s o u b o r y   p r o t o k o l u ,   p o k u d   s e   v   b u d o u c n u   s e t k � t e   s   p r o b l � m y .   V e   f � r e c h   s e   p Yi h l a s t e   a   z a d e j t e   d o t a z .   M o d e r � t o r   v � m   o d p o v �   a   p o r a d �   s   d a l a� m   k r o k e m .  P Ye j � t   n a   f � r a  Z o b r a z i t   p r o t o k o l y  T e n t o   � e t   u ~  s y n c h r o n i z u j e t e . L O t e v Ye t e   s v o j i   < a > s l o ~k u   O n e D r i v e      % 1 ! s ! < / a >   n e b o   s e   p Yi h l a s t e   j i n � m   � t e m . I P Yi h l � ae n �   s e   p Ye r u ai l o   n e b o   n e p o v e d l o .   Z k u s t e   s e   p r o s � m   p Yi h l � s i t   z n o v u . B K   t � t o   s l u ~b   n e m � t e   p Y� s t u p .   P o ~� d e j t e   o   p o m o c   s v o j e   I T   o d d l e n � . 6 V � a  � e t   s e   z a b l o k o v a l .   P o ~� d e j t e   o   p o m o c   o d d l e n �   I T . @ K e   s l u ~b   s e   n e d �   p Yi p o j i t .   P o ~� d e j t e   o   p o m o c   s v o j e   I T   o d d l e n � . S P r o   p Y� s t u p   k   t � t o   s l u ~b   p o t Ye b u j e t e   j i n o u   l i c e n c i .   P o ~� d e j t e   o   p o m o c   I T   o d d l e n � . [ S l u ~b a   m o m e n t � l n   z p r a c o v � v �   v e l k �   m n o ~s t v �   p o ~a d a v k o.   Z k u s t e   t o   p r o s � m   z n o v u   z a   p � r   m i n u t . B S l u ~b a   r e a g u j e   p Y� l i a  p o m a l u .   Z k u s t e   t o   p r o s � m   z n o v u   z a   p � r   m i n u t . B S l u ~b a   j e   d o a s n   n e d o s t u p n � .   Z k u s t e   t o   p r o s � m   z a   p � r   m i n u t   z n o v u . ; V � a  � e t   m �   n j a k �   p r o b l � m y .   P o ~� d e j t e   o   p o m o c   o d d l e n �   I T .  C h y b a   s e r v e r u :   % 1 ! s ! R K   t o m u t o   s h a r e p o i n t o v � m u   w e b u   n e m � t e   p Y� s t u p .   P o ~� d e j t e   o   p o m o c   s v o j e   I T   o d d l e n � .  S y n c h r o n i z u j e t e   j i n �   � e t ,� e t ,   p Ye s   k t e r �   j s t e   s e   p Yi h l � s i l i ,   n e o d p o v � d �   � t u ,   k t e r �   s y n c h r o n i z u j e t e .   Z a d e j t e   p r o s � m   h e s l o   p r o   % 1 ! s ! . 
 J e s t l i ~e   c h c e t e   p Yi d a t   d a l a�   � e t ,   k l i k n t e   v   o z n a m o v a c �   o b l a s t i   p r a v � m   t l a � t k e m   m y ai   n a   m o d r o u   i k o n u   m r a k u   p r o   O n e D r i v e   a   k l i k n t e   n a   N a s t a v e n � .   K l i k n t e   n a   k a r t u   � e t   a   p a k   n a   P Yi d a t   � e t .        N a � t � n � . . . PA P Yi h l a ao v � n �  O d h l a ao v � n �  O n e D r i v e   s e   a k t u a l i z u j e  P Yi h l a ao v � n � . . .     B T u t o   p o l o ~k u   n e m o~e m e   s y n c h r o n i z o v a t ,   p r o t o ~e   c e s t a   j e   m o c   d l o u h � . � Z k r a et e   c e s t u   o   n k o l i k   z n a k o  ( % 1 ! s ! )   a   z k u s t e   t o   z n o v u   n e b o   % 2 ! s ! n a s t a v t e   O n e D r i v e % 3 ! s !   t a k ,   a b y   s e   s y n c h r o n i z o v a l   s   u m � s t n � m   s   k r a t a�   c e s t o u .  O t e v Y� t   u m � s t n �  Z k u s i t   z n o v u  K o n e c � Z k r a et e   c e s t u   o   1   z n a k   a   z k u s t e   t o   z n o v u   n e b o   % 1 ! s ! n a s t a v t e   O n e D r i v e % 2 ! s !   t a k ,   a b y   s e   s y n c h r o n i z o v a l   v   u m � s t n �   s   k r a t a�   c e s t o u .                N a � t � n � . . .             P S l o ~k a   s   n � z v e m   % 1 ! s !   u ~  v   u m � s t n �   % 2 ! s !   e x i s t u j e .   Z v o l t e   p r o s � m   j i n �   u m � s t n � .           PA                             N e d o s t a t e k   m � s t a   n a   p o � t a i } V ae c h n y   s o u b o r y ,   k t e r �   m � t e � n a   O n e D r i v u ,   s e   n a   t e n t o   p o � t a   n e v e j d o u .   K l i k n u t � m   v y b e r t e   s l o ~k y ,   k t e r �   c h c e t e   s y n c h r o n i z o v a t . PA� V � a  O n e D r i v e   s e   n e d �   s t � h n o u t ,   p r o t o ~e   v � m   n a   p e v n � m   d i s k u   n e z os t a n e   d o s t   v o l n � h o   m � s t a .   K l i k n u t � m   v y b e r t e   s l o ~k y ,   k t e r �   c h c e t e   s y n c h r o n i z o v a t .  V � a  O n e D r i v e   s e   n e v e j d e . 7 O n e D r i v e % 1 ! s ! 
 V � a  O n e D r i v e   s e   n e v e j d e   n a   t e n t o   p o � t a .  N a s t a v i t   O n e D r i v e H K l i k n u t � m   v y b e r t e   s l o ~k y ,   k t e r �   c h c e t e   s y n c h r o n i z o v a t   s   t � m t o   p o � t a e m . ) O n e D r i v e % 1 ! s ! 
 D o k o n i t   n a s t a v e n �   O n e D r i v u     % D o k o n i t   i n s t a l a c i   i k o n   s y n c h r o n i z a c e L O n e D r i v e   o d   v � s   p o t Ye b u j e   o p r � v n n �   k   a k t u a l i z a c i   v a ai c h   i k o n   s y n c h r o n i z a c e . ) N e p o v e d l o   s e   n � m   s l o u i t   z m n y   v   s o u b o r u . ) K l i k n u t � m   o t e v Ye t e   s o u b o r   % 1 ! s !   v   O f f i c e . : N e p o v e d l o   s e   n � m   s l o u i t   z m n y   v   s o u b o r e c h   O f f i c e   ( % 1 ! s ! ) . & K l i k n u t � m   s e m   z � s k � t e   d a l a�   i n f o r m a c e .     PA                        0� e t ,   p Ye s   k t e r �   j s t e   s e   p Yi h l � s i l i ,   n e o d p o v � d �   � t u ,   k t e r �   s y n c h r o n i z u j e t e .   Z a d e j t e   p r o s � m   h e s l o   p r o   � e t   % 1 ! s ! . 
 P o k u d   c h c e t e   p Yi d a t   d a l a�   � e t ,   k l i k n t e   v   o z n a m o v a c �   o b l a s t i   p r a v � m   t l a � t k e m   m y ai   n a   i k o n u   m r a k u   p r o   O n e D r i v e   a   k l i k n t e   n a   N a s t a v e n � .   K l i k n t e   n a   k a r t u   � e t   a   p a k   k l i k n t e   n a   P Yi d a t   � e t . 5 O m l o u v � m e   s e ,   a l e   n e p o v e d l o   s e   n � m   n a s t a v i t   O n e D r i v e . � V a ae   s o u b o r y   n a   O n e D r i v u   u ~  s y n c h r o n i z u j e   s t a r a�   v e r z e   a p l i k a c e   O n e D r i v e   ( G r o o v e . e x e ) .   P o k u d   c h c e t e   p o u ~� v a t   t u t o   v e r z i   O n e D r i v u   z a s t a v t e   s y n c h r o n i z a c i   s o u b o r o  v e   s t a r a�   v e r z i   a   z k u s t e   t o   z n o v u . X V z h l e d e m   k   v a a�   k o n f i g u r a c i   v � m   n e m o~e m e   s y n c h r o n i z o v a t   O n e D r i v e .   < a > D a l a�   i n f o r m a c e < / a > PA] O t e v Ye t e   s v o j i   < a   h r e f = " s c : / / R o o t " > s l o ~k u   O n e D r i v e      % 1 ! s ! < / a >   n e b o   s e   p Yi h l a s t e   j i n � m   � t e m .                               PA N � z e v  C h y b a  Xe ae n � / T e n t o   s o u b o r   j e   p Y� l i a  v e l k �   a   n e l z e   h o   n a h r � t . 8 C h c e t e - l i   s o u b o r   n a h r � t   d o   s l u ~b y   O n e D r i v e ,   z m e n ae t e   h o . . T e n t o   n � z e v   s o u b o r u   o b s a h u j e   n e p o v o l e n �   z n a k y . � Z m Ht e   p r o s � m   n � z e v   s o u b o r u .   N � z e v   n a p Y� k l a d   n e s m �   z a � n a t   a n i   k o n i t   m e z e r o u ,   n e s m �   k o n i t   t e k o u   a n i   n e s m �   z a � n a t   d v m a   t e k a m i . 1 T e n t o   s o u b o r   j e   p r o   s l u ~b u   O n e D r i v e   p Y� l i a  v e l k � . G K u p t e   s i   v t a�   � l o ~i at   n e b o   o d s t r a Ht e   s o u b o r y ,   k t e r �   u ~  n e p o t Ye b u j e t e . , T e n t o   s o u b o r   O f f i c e   v y ~a d u j e   v a ai   p o z o r n o s t . = D a l a�   i n f o r m a c e   z � s k � t e   o t e v Ye n � m   d o k u m e n t u   v   s y s t � m u   O f f i c e . - T e n t o   n � z e v   s l o ~k y   o b s a h u j e   n e p o v o l e n �   z n a k y . 0 T a t o   s l o ~k a   j e   p r o   s l u ~b u   O n e D r i v e   p Y� l i a  v e l k � . � Z m Ht e   p r o s � m   n � z e v   s l o ~k y .   N � z e v   n a p Y� k l a d   n e s m �   z a � n a t   a n i   k o n i t   m e z e r o u ,   n e s m �   k o n i t   t e k o u   a n i   n e s m �   z a � n a t   d v m a   t e k a m i . T N a   O n e D r i v u   n e b o   v e   s v �   s d � l e n �   k n i h o v n   n e m � t e   p r o   t e n t o   s o u b o r   d o s t   v o l n � h o   m � s t a . e K l i k n t e   a   z � s k e j t e   v t a�   � l o ~i at   n e b o   s i   o d e b r � n � m   s o u b o r o,   k t e r �   u ~  n e p o t Ye b u j e t e ,   u v o l n t e   m � s t o . PA  _ O d e b e r t e   s o u b o r y ,   k t e r �   u ~  n e p o t Ye b u j e t e ,   n e b o   s i   k l i k n u t � m   z o b r a z t e   o b s a h ,   k t e r �   z a b � r �   m � s t o . ] T e n t o   s o u b o r   n e b y l o   m o ~n �   n a h r � t ,   p r o t o ~e   v l a s t n � k   s l o ~k y   n e m �   u   s e b e   n a   O n e D r i v u   d o s t   m � s t a . z O b r a et e   s e   n a   v l a s t n � k a   s l o ~k y   a   u p o z o r n t e   h o   n a   n e d o s t a t e k   � l o ~i at   n a   O n e D r i v u   n e b o   o d e b e r t e   s o u b o r y   z e   s d � l e n �   s l o ~k y .    s o u b o r y  s o u b o r y > U ~  m � t e   s o u b o r   n e b o   s l o ~k u   s   t � m t o   n � z v e m   v e   s t e j n � m   u m � s t n � . � P o k u d   c h c e t e   z a c h o v a t   o b   v e r z e ,   p Ye j m e n u j t e   p o l o ~k u   n a   t o m t o   p o � t a i   n e b o   v   o n l i n e   u m � s t n � .   P o k u d   j s o u   t y t o   p o l o ~k y   s t e j n � ,   m o~e t e   o d s t r a n n � m   v e r z e   n a   p o � t a i   s t � h n o u t   o n l i n e   v e r z i . j B o h u ~e l   s e   n � m   n e p o v e d l o   O n e D r i v e   v y p n o u t .   V y p n t e   p r o s � m   O n e D r i v e   r u n   a   p o t o m   z k u s t e   o p e r a c i   z o p a k o v a t . a B o h u ~e l   s e   n � m   n e p o v e d l o   o b n o v i t   s t a v   O n e D r i v u .   P o k e j t e   p r o s � m   1   m i n u t u   a   p o t o m   t o   z k u s t e   z n o v u . y B o h u ~e l   j s m e   n e m o h l i   z � s k a t   p Y� s t u p   k   m � s t n �   s l o ~c e   d a t   a p l i k a c e .   Z k o n t r o l u j t e   p r o s � m ,   ~e   m � t e   o p r � v n n �   d o   n �   z a p i s o v a t . V J e   n � m   l � t o ,   a l e   z a d a l i   j s t e   n e p l a t n �   I D   i n s t a n c e .   Z a d e j t e   p r o s � m   s p r � v n �   I D   i n s t a n c e .    T e n t o   s o u b o r   j e   j e n   p r o   t e n � . V A b y   b y l o   m o ~n �   t e n t o   s o u b o r   s y n c h r o n i z o v a t ,   m u s � t e   p r o   n j   u d l i t   o p r � v n n �   k   � p r a v � m . ' T e n t o   s o u b o r   m �   r e z e r v o v a n �   n k d o   j i n � .  Z k u s t e   t o   p r o s � m   z n o v u   p o z d j i . 1 S k r y t �   p o l o ~k a   s   t � m t o   n � z v e m   u ~  e x i s t u j e   o n l i n e . W P Ye j m e n u j t e   p o l o ~k u   v   p o � t a i   n e b o   j i   p Ye s u Ht e   d o   j i n �   s l o ~k y ,   a b y s t e   j i   m o h l i   n a h r � t . + 1   s o u b o r   s e   n e d �   s y n c h r o n i z o v a t   s   O n e D r i v e m < N k t e r �   s o u b o r y   ( % 1 ! s ! )   s e   n e d a j �   s y n c h r o n i z o v a t   s   O n e D r i v e m N D o s � h l i   j s t e   m a x i m � l n � h o   p o t u   p o d v e r z � ,   k t e r �   m o~e t e   p r o   t e n t o   s o u b o r   u l o ~i t . � P u b l i k u j t e   s o u b o r   n a   s h a r e p o i n t o v � m   w e b u :   K l i k n t e   p r a v � m   t l a � t k e m   n a   s o u b o r   a   v y b e r t e   D a l a�   >   P u b l i k o v a t .   P o t o m   m o~e t e   z n o v u   z a � t   u k l � d a t   p o d v e r z e .                 PA      ! O t e v Y� t   v a ai   s l o ~k u   O n e D r i v e % 1 ! s ! O O n l i n e   v e r z e   a   v e r z e   v   p o � t a i   o b s a h u j �   z m n y ,   k t e r �   s e   n � m   n e p o v e d l o   s l o u i t .  P o k l i k a t   a   v y Ye ai t  P r o b � h �   a k t u a l i z a c e . . .  K l i k n o u t   a   v y Ye ai t * S l o ~k a   % 1 ! s !   u ~  v   t o m t o   p o � t a i   e x i s t u j e . � P o k u d   t u t o   s l o ~k u   s y n c h r o n i z u j e t e   p o p r v �   n e b o   p o k u d   s i   n e j s t e   j i s t � ,   z v o l t e   n o v o u   s l o ~k u ,   a b y s t e   p Ye d e al i   k o m b i n o v � n �   s o u b o r o  z e   d v o u   r oz n � c h   s l o ~e k .  V y t v o Yi t   n o v o u   s l o ~k u > J e   n � m   l � t o ,   a l e   n e p o v e d l o   s e   o t e v Y� t   s y n c h r o n i z a n � h o   k l i e n t a > N e p o v e d l o   s e   z p r a c o v a t   a d r e s u   U R L .   K o n t a k t u j t e   p r o s � m   p o d p o r u . m P o k u d   p r o   s l o ~k u   % 1 ! s !  