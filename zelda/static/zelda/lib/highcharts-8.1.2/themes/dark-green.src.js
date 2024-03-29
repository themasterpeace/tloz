am {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @param {number} direction
     * @return {number} Response code
     */
    onInputKbdMove: function (keyboardNavigationHandler, direction) {
        var chart = this.chart, response = keyboardNavigationHandler.response, newIx = chart.highlightedInputRangeIx =
            chart.highlightedInputRangeIx + direction, newIxOutOfRange = newIx > 1 || newIx < 0;
        if (newIxOutOfRange) {
            return response[direction > 0 ? 'next' : 'prev'];
        }
        chart.rangeSelector[newIx ? 'maxInput' : 'minInput'].focus();
        return response.success;
    },
    /**
     * @private
     * @param {number} direction
     */
    onInputNavInit: function (direction) {
        var chart = this.chart, buttonIxToHighlight = direction > 0 ? 0 : 1;
        chart.highlightedInputRangeIx = buttonIxToHighlight;
        chart.rangeSelector[buttonIxToHighlight ? 'maxInput' : 'minInput'].focus();
    },
    /**
     * @private
     */
    onInputNavTerminate: function () {
        var rangeSel = (this.chart.rangeSelector || {});
        if (rangeSel.maxInput) {
            rangeSel.hideInput('max');
        }
        if (rangeSel.minInput) {
            rangeSel.hideInput('min');
        }
    },
    /**
     * Get keyboard navigation handlers for this component.
     * @return {Array<Highcharts.KeyboardNavigationHandler>}
     *         List of module objects.
     */
    getKeyboardNavigation: function () {
        return [
            this.getRangeSelectorButtonNavigation(),
            this.getRangeSelectorInputNavigation()
        ];
    }
});
export default RangeSelectorComponent;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 x콍[[G�7z��w	'�ٽ㉓�Ⰳ�8��؋:�!i%Ꮝ����Ϯ>�H�c��yG�#��]]]U]]]]]}2�_������O����^��i4���������ރ{'��l:�t����V�MGW��rz��ѽv{�~��O'��W��@Jd���r2kx~r5���/N���մl�u:��i�P�7�{��M /G�n��h4 ��a���r� �J����W��xR5ԙ�N��t���ݬ{��tԝ2�^8q7G�Y9���?������X�h�ȘZ�^}�����ʃB9��w���pZ���a��O����l6�>X_?��.�Nڧ��������	di��)'�;ۛ�݃��`��|�|ؿ�&�b�8��.�������]�7�d܃�����,'��3v���r0ƈ��}$`����p:+�7v���v�;�[��bcQQ(�=�X�=����m*��}���흝��������g;��Ow�;�Z�	�^\��f�Wlϯ��$Á�Q�|�>~��?��г��)Q���ߎ����Ǖ�g�]L���dX���=�&��y��;p��ewvz�Z�|�:��ϋ�V��+G��@ٝ��r�ٝ�-�O8y���`\�������W �J��BQ��=��A�v��W�s�rA���7([%��M��Y�Z���Yw�V��ikvџ��bN��`{'?�I�;�r��`�.��t�X_/��?������ɠ\Ï�Oʳr�6)���qwҽ$q�%_��4V�P�7�p��e�.��9͓�A�;�W��l4i��&]b�vuP�
b.�{X�uӒ�VKB��hX��Ѥ�K�j�=�Z�Hf�+ (��� �;-g���2��*>�v͹!��y9��D���]-�#ҒR��X%!��8���1�[j��%ӧ�ʁ"�4d��E.�"�G4z����^�تnm~Z<�:�O¬����G����ต�$D�\X�'ӌ���T䁶k���qA�L���10,��dLa ��g��$�2�P��������;�h���%X�i������{�������ٴ�*�.��f��k�F*+�E9Q������Vot�C��;��F����=��PQi|�������S�o1�)�$'K�O\b���͍쮲���κk�u��z�ī�{�<Ĵ�eoÖ�P���m�
PBc�����}���4S|����X 9�DGPXQї��m��)�ƀQ�e�� �}���`�@��07�r2	�T��\�I2�T7.�k�*����+��l��Ljd��V1:+f��V��SYC�����>�N[�zp�ơ
�r�}{ *�H�#��f@�״��^�ꨪ�4�PT��Kb�m_���4_kߋ�$P�'��?-��Yq6´(td&������;n�&���>+0S`=]`��b��/��W�Y��X{֟Lg�P�R�I�a{:�g���啣�/jU���=�V�j*��fj��Y�\�	�Z���FL�A=F�]B�������&������j7��&�+ȿ�o�s�����m�=�]b�W�ū?�S������ �XV��pQ�iG�c0��>=�
(_2���Q���H�L�͋��������:l[k8��^���������Ӓ��r>)P��c,��2K=�*yQ�`�b"i��lD���>��b܇�77����L�Y���R*>*���ҫ�ત���Jה��hy����vV�>?���
S,��,cvе���A�XC����Λq+��J{;�ŵ����.&����L&0X�r�猛X=�M�2z��xY|V��7���{K?	��<��W�Ls�ZAo%z]������J���2E���@1Lń4�����!���.|2�p5�F8ѧk��#�ݝͺ�R݅�I6���!�&��?��r1A��&d���2���\���+@'"�W����]��!Y'�,��B�VfoYMZ�2��i.��(�O��D'� �̌1xE�1�چ�uRiqi�M'P��E9,^�˘��n�H�D�O����d@�z;,Q2�k�v�H��������*gPXn&%�$���l�Gc$�2Ζ������������?��'�}��⺐f��s5��	� ��+I'%�gY��6+�ɬ�K<�dH�jQ�T6�<[�/!5/��'�����~����S��������)[�0��7��(b��i��ڂ����so3��@#�v^�^1���
Np��}h�e�����;+0/��������?�?/H���:���������٘�,�5�|i�t��
�IJXw]�}<�<~G�v���5�;����ק��^₺{ۼ�pw��M2��p�1�>����Ɠ�L��1�4��~��?��7��7b����8�8�K�o�
�L�9������J���������K�󓍧۱8`��w�������g��������-����!i�#����lE��l�nm<�>8�������?�>|~��~~�Z�( ��k�7w��`�F�r�g�������[N+�k*����c�9����O���J	C�
�m��)����Ng���'|`t����xv����*����~�GӋ�k����,ʌa�E+N�Ÿ#�&:��'�f�M��yU����>6��M(���]y���ǆ�H�14g�O�:+tx$#A�}����`Y��B.��:�F3�\f��i���ڏ
�[0�9[����[���Y]�n�\�Vhfe�'�ƞ�Ks��	���^+�C�B��^��y[��1�I$_jK�-x����\-L���Q�4�11Z7ڤo�shZ�
��{(�<T2M�䏓��� eŐma�l�Vx�+��Oc���ܑ�MЂ���+H�ɮMڬF޿L��w�M�����s�xܠI�R[���o��t)H�#%�U�*6�y�(�*6��޷HG:2L�P~�jyR�Q�E�zX�OFoM��-1+�Bߙ�� �lB�}����͒'�����2¼e�����SFE��<��	���pk��W�R=-q�cO�p� B[	)a�Oc���y�ۏ���F ��{Z��
~-^�4&II�ʜ���e�uI�~�椑�� j�e+����`��*��B`@���Ó^�u$��`�I���iQ?�aY��k\i�Hʼțj�6R]�y,��[bf��(�VW�wHI���T%T�"p����\��e���k��>��wb�<E���2��6����l��K�ﷂA�?��3�G&R[c~�ծp.I�
،w�"���(�+W�<�!Ԯj��ô�ho��L�I�j&Q�~8B�3��3Z�@%X�A�������{E�\V��������:f�?����D�E�7Z�k|����h���!C2��-��"C�<%lln��E.��tI����!�X�̆���vo�ف�|
1�u.&1x��b7�<��=~��9����߃W����`6:?��G��<�-C54��J5�5m�f�j�y��Z������5V��ۻO�Q����W�ؕn�f�_�{�r��+�E�wV�(�FLJ���B�@���Ȩ�	�Mp�p��xA�����G;��3�1{����c��dp5YP_�<;{[�Y� �m��y�o������+�Zq<�HPW�
�2�H^(l�$=��Т ��gE��ۘ��pcL)9��<x+ƽ;VĶ�b�fu���iG-!/ei-�ɾ��0��Q�&:�*� o��9h�g ����M�^��I���F,xJ1 ���oݓr�N���G�9(6�b�0,�E��E���5\����{l�bW՗�F#���^�@�y�Rd̩e��2hݤ�R�����o�`�_^n؃�C{��
�aʟ��4�&���{.�`�;��x��Y����6��X^�.������F��Q.�Q݂��6�pZ�����s�����Q˴���"ΠߓbN�I@8�H���yB����@E�x%h,"��+U��B����7"��#֝˧��l�P�(U��y�KKࢮϲ���yo�����T���a�'ރ b���>.k\9��1O��6�f;��.�������816} ��_Q!��]��2�\3���Gr�~�;�q��&��w^��1���'o���n�~�ʒ@��*2����!
wb��V. R�jt5�'����	v�%O��H���kFGz,��P� K-)�Bʣ:*d���L��E3�m�偦��R�H�m���"3^�V�ȐnV����z4�	��[|����� p^���?~�Í�Y7Z�\a}�h6�Q���:���U��.~,�5�f��ngz����F���l�r��#9�Y��I��K�*����&>@ Iy�&�nX��V��-���x'���R�HG!��)��=�Z��������7K���-�'תt���kɍ^���c-[qfǚ �8=y�h���d�.�Ҽ`~S�9�Q2��HFd����t��^u�k�|*�FJ��X��C��a�t}R�BAwJ����䭅5�|q�Q1�P^U	U) ��E�NKa�EC����9���B%-�����W�PL�6~��.���)+����g.�^+zG�"�a��xx������@h$y�[Qj��(JjF��R}�$V��Z]��b��@;[���9,` %$��<��/d�]��$���<c���h�-����r��N��_i���<��m�lf[&�X�g�n�І��i*{&����i�`��+(򆡍L+���bG���X�p[E�^)� Y�ڴ�¥o��"�o)�eӮ��JҎ��;�o9\ss�B�����ݿ�oOF�IO,0��E���Ϡ<�Ɂ&���ʷ9�����e0��� ᦹh�y��l�;���ޓ���?l W�����P:��(]RR�C�c�b�����t�	�3:>�������O;Ǉ��w��㱛�/q��
i�Zc$|P�D�^Z��[�>�	�h��g0y`��@����q������C���������hz�m�(Jt������򤜼;�sb���\�7�z�t��o�a�y�jD�%o*�Cr��"�x�'0�'���ʎ6��,� �t��h��e�$מ�8�S>!�2KԂ����mz���7�d�
r��>T�^��[{?�ZQ��)iL�蓽g�J#M}P��+�2ۉ��Ng���4N�j�F�!sp���`-͜��?��1��O�4a¥�p�%D>V�6P���6��(����-'���Ϟ:h-~5�㱵���8�bo�=���lŴ�nώle����Pml2�w��i����fWʂ˲���e/YT+2�u��f�����\�a�M��i.�����c��`�ۇ�'\���tDE���=Q@%`��y>�m�h�#R5��jyw�(�w>13���%��(��o?yL��A�׹#
��[#�9xrs�n������8�ۗ`�Pn��#��h2�Vx����V$t�E��j~a���E�y�	�+�Xo)� S�Oi�yO¤�j���B�y�!݇g��C �d���;��Oʦ&�=���������f�ț���)���a7%�L�}�!�T��쉞4���S�`��<��� .�l��7(RÀ�cKa2�+A��E|��V9�u����tB(-��