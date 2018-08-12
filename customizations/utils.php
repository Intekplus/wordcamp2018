<?php

function _tr( $string ) {
    // if polylang
    // pll_e( $string );

    _e( $string, 'intek-theme');
}

function __tr( $string ) {
    // if polylang
    // return pll__( $string );

    return __( $string, 'intek-theme');
}

function ppl_r( $name, $string) {
    pll_register_string( $name, $string, 'intek-theme' );
}
