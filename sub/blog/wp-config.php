<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'bandcloud');

/** MySQL database username */
define('DB_USER', 'Dominik');

/** MySQL database password */
define('DB_PASSWORD', 'quawer');

/** MySQL hostname */
define('DB_HOST', 'mariadb55.websupport.sk:3310');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ':R#DIB5Rl$)zz`/JeRFAuOL%L|0/;Y<s;O#|m7 ^df3@Lc/6O,,^v`MVY];*l~(p');
define('SECURE_AUTH_KEY',  '|c_|i:vX=({yauyuz-|FJFkbg&65|`OCVl|wGC<X=#f1~p+,Ao^@,/1]Ei;&S+XS');
define('LOGGED_IN_KEY',    '~g8VSAe3nn[Y96_6[{&1f^rf1wq!9(FJ46VU^`;}W&Cber#Q[<[23:x#,p|*aooG');
define('NONCE_KEY',        ']7dm)|wwPWcV6n_I6JorA-D^9T:sz@QeFo;kPyr.r6IbZ]e@`f7=n=#`GiH-_?j@');
define('AUTH_SALT',        '%vv;!&i:g8R?pUBT&_dbBAP-ToEc{Z1BIlIn!gY::}+~14C{$-!`+k|h=~hJ=Mt4');
define('SECURE_AUTH_SALT', 'YV|;@oxdM|mQB<#lL.Cw2Zc9%c5L%{BSp!#wYXWe9tFGsi_M,|`V*}?_J--PD~G0');
define('LOGGED_IN_SALT',   '|Uny?Ky$kzw&nrb(y5%idlG7,zYd+ZilMy*V(+7qcCBIq4E%E7]|f/HHr.)xCw/B');
define('NONCE_SALT',       'ZY]w+I5q=`(JJ@G}s_FG~|p-6H3RfHsyZB/Nz||O8t#uA6z|`wa(c Y`2Br7Pcor');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
