<?php

// INIT
include_once $_SERVER['PHP_ROOT'].'/html/init.php';
include_once $_SERVER['PHP_ROOT'].'/lib/share.php';
include_once $_SERVER['PHP_ROOT'].'/lib/wall.php';
include_once $_SERVER['PHP_ROOT'].'/lib/groups.php';
include_once $_SERVER['PHP_ROOT'].'/lib/events.php';
include_once $_SERVER['PHP_ROOT'].'/lib/forms_lib.php';
include_once $_SERVER['PHP_ROOT'].'/lib/mobile/mms/data_lib.php';
include_once $_SERVER['PHP_ROOT'].'/lib/notebook.php';
include_once $_SERVER['PHP_ROOT'].'/lib/photoprint.php';
include_once $_SERVER['PHP_ROOT'].'/lib/api/auth.php'; // for api_param_get
include_once $_SERVER['PHP_ROOT'].'/lib/wall.php';
include_once $_SERVER['PHP_ROOT'].'/lib/ratings/public.php';

// PARAMETERS
param_get_slashed(array('pid'   => $PARAM_INT,
                'l'     => $PARAM_STRING,
                'subj'  => $PARAM_INT,
                'aid'   => $PARAM_SINT,
                'auser' => $PARAM_INT,
                'op'    => $PARAM_INT,
                'id'    => $PARAM_INT,
                'oid'   => $PARAM_INT,
                'oview' => $PARAM_STRING,
                'view'  => $PARAM_STRING,
                'name'  => $PARAM_STRING,
                'e'     => $PARAM_EXISTS,
                'ref'   => $PARAM_STRING,
                'psid'  => $PARAM_SINT,
                'prev'  => $PARAM_EXISTS,
                'saved' => $PARAM_EXISTS));

if ($api_params = api_param_get(array('uid', 'apid'))) {
  $get_id = $api_params['uid'];
  $get_pid = $api_params['apid'];
} else {
  // process any POST operations here
}
$pid   = $get_pid;
$code  = $get_l;
$subj  = $get_subj;
$aid   = $get_aid;
$auser = $get_auser;
$opage = $get_op;
$id    = $get_id;
$oid   = $get_oid;
$psid  = $get_psid;
$oview = txt_set($get_oview);
$view  = txt_set($get_view);
$name  = $get_name;
$elink = $get_e;

$guest = null;

// try get keys if pid not present
if (!$pid) {
  $id   = (int) extract_arg_from_get_key('id');
  $pid  = (int) extract_arg_from_get_key('pid');
  $code =       extract_arg_from_get_key('l');
}

// if $code exists, this is a guest request
if ($pid && $code) {
  $guest = true;
  $GLOBALS['AIM_MODE'] = 1;
}
tpl_set('guest', $guest);

// EMAIL PHOTO TAG LINK
if ($elink) {
  // This is the case in which a user received an email about being tagged
  $user = require_login(true);
  $tag = photos_get_email_tag($pid, $subj);

  // Uh oh, th tag must have been removed since the user received the email
  // about it... just go to photo search!
  if (!$tag) {
    redirect('photo_search.php?id='.$user);
  }

  // Get all the necessary parameters from the photo tag, note that we do
  // explicitly set $get_aid in this case, as the code lower on the page should
  // behave as if aid was set as a GET parameter to this page.
  $aid = $get_aid = $tag['aid'];
  $id = $tag['user'];
  $auser = $tag['user'];
  $view = $get_view = 'album';
  $opage = 1;
}

// validate args
if ((!$pid || !$id) && !$psid) {
  // mcslee+lucas: rip debug_rlog() we will NEVER figure these out
  exit_standard_error_page();
}

// up front cache requests
$photo_template = array();
if (!$psid) {
  photos_get_phototemplate($pid, $id, true, $photo_template);
} 
user_get_aim_code($id, true);
user_get_info_confirmed($id, true);
$profile = array();
if ($subj && is_tuna_obj($subj)) {
  profile_get_short($id, true, $profile);
} else {
  profile_get_short($subj ? $subj : $id, true, $profile);
}
if (!$guest) {
  if ($user > 0) {
    printshop_get_cart_items($user, true);
  }
}
memcache_dispatch();

// defer to id argument for connection handling
if ($id) {
  if (check_down(id_to_db($id))) {
    error_redirect($error_msg = "Photos Unavailable",
                   $error_explanation = "We're sorry, photos aren't available right now.  Please try again later",
                   $page_title = "Photos Unavailable",
                   $header = "Photos Unavailable");
  }
}

$from_search = (int)($view || $subj || $aid || $name);

// build photo search parameters
$photoqs = null;
if ($from_search) {
  $photoqs  = $oview ? "&o=$oview" : '';
  $photoqs .= $opage ? "&op=$opage" : '';
  $photoqs .= $view  ? "&view=$view" : '';
  $photoqs .= $subj  ? "&subj=$subj" : '';
  $photoqs .= $aid   ? "&aid=$aid" : '';
  $photoqs .= $auser ? "&auser=$auser" : '';
  $photoqs .= $name  ? '&name='.url_set($name) : '';

  tpl_set('photoqs', $photoqs);
}


/*
 * PREFETCH PHOTO DISPLAY OBJECT
 */
if (!$psid && ($photo_template == null)) {
  // check to see if this is a deleted photo, this case happens all the time
  if ($conn = id_get_conn($id) &&
      $ret = queryf($conn, 'SELECT max(pid) FROM photo')) {
    $row = mysql_fetch_row($ret);
    if ($row[0] < $pid) {
      debug_rlog('PHOTOS: invalid photo id, pid:'.$pid.' id:'.$id);
    }
  }

  // if they're from photo_search and are requesting a bad photo, chances are it's because
  // the pagination got screwed up... let's redirect them to a photo that's actually valid
  if ($from_search) {
    $search_meta = photo_search_meta($user, $opage, $oview, $view, $subj, $get_aid, $auser, $name);
    $navids  = explode('-', $search_meta['photos_' . $view]);
    if ($get_prev) {
      $navids = array_reverse($navids);
    }
    $offset = array_search($pid . ',' . $id, $navids) + 1;
    $photo = false;

    // loop through their photos 8 at a time and try to find one that's valid
    while (!$photo && ($next_photos = array_slice($navids, $offset, 8))) {
      $offset += 8;
      foreach ($next_photos as &$val) {
        $val = array_combine(array('pid','user'), explode(',', $val));
      }
      unset($val);
      $next_photos = multiget_photos($next_photos);

      foreach ($next_photos as $val) {
        if ($val) {
          $photo = $val;
          break;
        }
      }
    }

    if ($photo) {
      redirect('photo.php?pid='.$photo['pid'].'&id='.$photo['user'].$photoqs);
    }
  }
  exit_standard_error_page(array('pid' => $get_pid, 'aid' => $get_aid, 'subj' => $get_subj, 'uid' => $get_id));
}
else if ($psid && ($photo_template = printshop_get_phototemplate($pid, $psid)) == null) {
  redirect('photoprint.php');
}

if (rand(1, 100000) > get_site_variable('WALL_POST_OLDEST_ENTRY_THROTTLE')) {
  if (empty($photo_template['comments'])) {
    $time = 0;
  } else {
    $time = $photo_template['comments'][count($photo_template['comments']) - 1]['time'];
  }
  $message = scribe_create_message('wall_survey', 'photo: '.$time.' '.$photo_template['created']);
  scribe_add_messages(array($message));
} 

if (check_super($user)) {
  // If we're a superuser, we can see deleted comments. These are not cached, and so we are going to fetch them manually now.
  $sql = 'SELECT 1 AS is_deleted, `id`, `from`, `time`, `text` FROM `wall_deleted` 
            WHERE `to` = %d AND `media_type` = %d AND `media_id` = %d UNION 
          SELECT 0 AS is_deleted, `id`, `from`, `time`, `text` FROM `wall` 
            WHERE `to` = %d AND `media_type` = %d AND `media_id` = %d 
          ORDER BY `time`';
  $conn = id_get_conn($photo_template['user']);
  if ($ret = queryf($conn, $sql, $photo_template['user'], 1, $pid, $photo_template['user'], 1, $pid)) {
    $photo_template['comments'] = array();
    while ($row = mysql_fetch_assoc($ret)) {
      $photo_template['comments'][] = $row;
    }
  }  
}  

//keep track of tuna contexts
$tuna_oids = array();
foreach ($photo_template['tags'] as $tag) {
  $tag_subj = $tag['subject'];
  if (!isset($tag['pending']) &&
      is_tuna_obj($tag_subj) &&
      obj_can_see($tag_subj, $user)) { //could check obj_can_see in phpt
    $tuna_oids[] = $tag_subj;
  }
}
tpl_set('tuna_oids', $tuna_oids);

// If we're on an object photo but don't have the object id get get it
if (!$from_search && $photo_template['aid'] == -1) {
  $from_search = 1;

  foreach ($photo_template['tags'] as $tag) {
    if (is_tuna_obj($tag['subject'])) {
      $subj = $tag['subject'];
      break;
    }
  }

  if (!$subj) {
    debug_rlog('Unable to find object tag for photo with aid==-1');
  }
  
  // Set default query parameters
  $view = 'all';
  $opage = 1;
  $aid = -1;
  
}

$aid = $photo_template['aid'];
$share_hrefs = share_make_photo_hrefs($id, $pid, $subj);

/*
 * PERMISSIONS CHECKING
 */
$photo_guest = null;
if (photo_code($id) == $code) { //For legacy's sake
  $photos_guest = true;
 } else if (photo_code($id, $aid) == $code) {
  $album_guest = true;
} else if (photo_code($id, $pid) == $code) {
  $photo_guest = true;
}
tpl_set('photo_guest', $photo_guest);

if ($guest && !($photos_guest || $album_guest || $photo_guest)) {
  exit_standard_error_page(array('pid' => $get_pid, 'aid' => $get_aid, 'subj' => $get_subj, 'uid' => $get_id));
} else if (!$guest) {
  flag_allow_guest();
  $user = require_login(true);
}

$is_unregistered = 0;
if ($user > 0 && is_unregistered($user)) {
  $is_unregistered = 1;
}
tpl_set('is_unregistered', $is_unregistered);

// Check privacy for back to profile link
$can_see_profile = can_see($user, $id, 'profile');
tpl_set('can_see_profile', $can_see_profile);

// check permissions
if (!can_see_photo($user, $photo_template)) {
  exit_standard_error_page(array('pid' => $get_pid, 'aid' => $get_aid, 'subj' => $get_subj, 'uid' => $get_id));
}

$my_photos = null;
if ($user == $id ) {
  $my_photos = 1;
}
tpl_set('my_photos', $my_photos);

/*
 * SETUP PHOTO DATA
 */
tpl_set('photo_img_src', $photo_template['img_src']);
tpl_set('photo_order'  , $photo_template['order']  );
if (!is_sponsored_group_page() || !sgroup_hide_caption($subj, $pid)) {
  tpl_set('photo_caption', txt_set_with_urls(trim($photo_template['caption'])));
}
tpl_set('photo_source',  $photo_template['source']);

tpl_set('photo_img_width',  isset($photo_template['width']) ? $photo_template['width'] : null);
tpl_set('photo_img_height', isset($photo_template['height']) ? $photo_template['height'] : null);

/*
 * SETUP ALBUM DATA
 */
$album_href = redirect("album.php?aid=".$photo_template['aid'].'&id='.$id, id_get_map($id), 0);
if($photo_template['order'] > 20) $album_href .= "&page=" . ((int)(($photo_template['order']-1) / 20) + 1) ;
if($guest) $album_href .= "&l=" . $code;

tpl_set('album_size', $photo_template['album_size']);
tpl_set('album_href', $album_href);
txt_set('album_name', $photo_template['album_name']);


/*
 * SETUP PREV/NEXT LINKS
 */
if ($from_search) {  // from photo_search
  if ($elink || $get_ref == 'nf' || $get_ref == 'mf') {
    // If the user came from an email link, then there is no guarantee that
    // photo_search has been called to properly populate the photo_search
    // results. Therefore, we need to call photo_search() directly instead of
    // using photo_search_meta(). This way, we always properly populate the
    // count and prev/next stuff.
    //
    // Note, this is now also true for links from feed and/or minifeed.
    $search = photo_search($user, $oview, $view, $subj, $get_aid, $auser, $name, $opage);
    $search_meta = $search['meta'];
  } else {
    $search_meta = photo_search_meta($user, $opage, $oview, $view, $subj, $get_aid, $auser, $name);
  }

  $navids  = explode('-', $search_meta['photos_' . $view]);
  $current = array_search($pid . ',' . $id, $navids);
  $total   = count($navids);

  if ($current === FALSE) {
    
    // this can happen if something has changed since the search was run, and
    // this photo no longer matches. It's ok to display it since we passed the
    // can_see checks, but prev & next don't make any sense
    $next = null;
    $prev = null;
    $next_href = null;
    $prev_href = null;

  } else {

    switch($current) {
      case 0:         // first or only
        $prev = ($total==1) ? $navids[0] : $navids[$total-1];
        $next = ($total==1) ? $navids[0] : $navids[$current+1];
        break;
      case $total-1:  // last, more than one
        $prev = $navids[$total-2];
        $next = $navids[0];
        break;
      default:        // middle
        $prev = $navids[$current-1];
        $next = $navids[$current+1];
        break;
    }
  }

  $next_pid = null;
  $next_id = null;
  if ($next) { 
    $arr = array_combine(array('pid','id'), explode(',',$next));
    $next_href = "photo.php?pid=$arr[pid]&id=$arr[id]$photoqs";
    $next_pid = $arr['pid'];
    $next_id = $arr['id'];
  }

  if ($prev) {
    $arr = array_combine(array('pid','id'), explode(',',$prev));
    $prev_href = 'photo.php?pid='.$arr['pid'].'&id='.$arr['id'].$photoqs.'&prev';
  }
  
  if ($next_oid = is_obj_photo($photo_template['tags'])) {
    if ($next_href) {
      $next_href .= "&oid=$next_oid";
    }
    if ($prev_href) {
      $prev_href .= "&oid=$next_oid";
    }
  }
 
  tpl_set('searchqs', photo_search_qs($opage, $oview, $subj, $get_aid, $auser, $name));  // used for back to search
  tpl_set('search_index', $current+1);
  tpl_set('search_total', $total);

} else if ($psid) {
  $next_href = 'photo.php?pid='.$photo_template['next'].'&psid='.$psid;
  $prev_href = 'photo.php?pid='.$photo_template['prev'].'&psid='.$psid.'&prev';
} else {
  $next_href = 'photo.php?pid='.$photo_template['next'].'&id='.$id;
  $next_pid = $photo_template['next'];
  $next_id = $id;
  $prev_href = 'photo.php?pid='.$photo_template['prev'].'&id='.$id.'&prev';
}
tpl_set('next_pid', $next_pid);
tpl_set('next_id', $next_id);

if($guest) {
  if ($next_href) {
    $next_href .= "&l=" . $code;
  }
  if ($prev_href) {
    $prev_href .= "&l=" . $code;
  }
}

/*
 * SETUP TAGS
 */
$next_photo = null;
if (!$psid) {
  // fetch info about the next photo
  if (get_site_variable('PHOTO_PREFETCHING_ON')) {
    if ($next_pid && $next_id) {
      $next_photo = array();
      photos_get_photo($next_pid, $next_id, true, $next_photo);
    }
  }

  // get tag meta data
  tpl_set('tags', setup_tag_links($photo_template['tags'], $user, $id, $aid, 1, (is_tuna_obj($subj) ? $subj : 0), $pid));
  // there is one of these inside setup_tag_links, but here just in case the
  // code is moved later
  memcache_dispatch();
 } else {
  tpl_set('tags', array());
 }

// get the URL of the next image so we can do prefetching
$next_img_src = null;
if ($next_photo) {  
  $next_img_src = photos_get_url_from_photo($next_photo, 'n');
}
tpl_set('next_img_src', $next_img_src);

tpl_set('next_href', $next_href);
tpl_set('prev_href', $prev_href);

/*
 * SETUP PHOTO EDIT LINKS
 */
if ($my_photos) {
  $rotate_left = distfs_get_upload_server() . "photos_rotate.php?pid=$pid&left=1";
  $rotate_right = distfs_get_upload_server() . "photos_rotate.php?pid=$pid&right=1";
  $return = urlencode("photo.php?pid=$pid&id=$user{$photoqs}");

  $rotate_left .= "&return=$return";
  $rotate_right .= "&return=$return";

  tpl_set('rotate_left' , $rotate_left);
  tpl_set('rotate_right', $rotate_right);
  
  tpl_set('edit_href', redirect('/editphoto.php?pid='.$pid, id_get_map($id), 0));
  tpl_set('delete_href', redirect('/editphoto.php?delete=1&pid='.$pid, id_get_map($id), 0));
}

/*
 * DO THE PRINTSHOP STUFF
 */
$printshop_add = null;
$is_in_cart = null;
$is_pending = null;
if (!$guest) {
  $in_cart=printshop_is_in_cart($user, $aid, $pid);
  if ($in_cart == 2) {
    $is_in_cart = true;
  } else if ($in_cart == 1) {
    $is_pending = true;
  } else if ($user==$id || (are_friends($user, $id) && printshop_get_user_permission($id) != 1)) {
    $printshop_add = 'pid=' . $pid .'&ownid=' . $id . '&aid=' . $aid;
  }
}
tpl_set('printshop_add', $printshop_add);
tpl_set('is_in_cart', $is_in_cart);
tpl_set('is_pending', $is_pending);

/*
 * COMMENTS
 */
if(!$guest) {
  $comments = array();
  if ($psid) { // printshop albums are stripped down
    $can_post = false;
  } else if ($subj && is_tuna_obj($subj) && obj_is_active_member($subj, $user)) { 
    // all memers of a tuna object can post photo comments
    // exception: photo owner has blocked viewer - see #1889
    $can_post = !blocked($id, $user);  
  } else {
    $can_post = photo_can_make_photo_comment($user, $id);
  }

  tpl_set('can_post', $can_post);

    if($is_unregistered) { $can_post = false; }

    $comment_links = array('message'=>true);
    if($subj && is_tuna_obj($subj)) {
      // display 'Report' links for photo comments in groups/events
      $comment_links['report'] = true;
    }

    // prime can_see data
    $comment_users = array();
    foreach ($photo_template['comments'] as $comment) {
      $comment_users[] = $comment['from'];
    }

    multiget_can_see($user, $comment_users, true);
    profile_multiget_short($comment_users, true);
    memcache_dispatch();

    foreach ($photo_template['comments'] as $comment) {
      if (($user == $id && !is_disabled_user($comment['from'])) || !blocked($user, $comment['from'])) {
        $comment['to'] = $id;
        $comment['media_type'] = 1;
        $comment['media_id'] = $pid;
        $comments[] = convert_wall_to_display($comment, $comment_links);
      }
    }

    if ($can_post) {
      $oid_str = (is_tuna_obj($subj) ? "&oid=$subj" : '');
      tpl_set('comment_post_url', "editwall.php?action=post&pid=$pid&id=$id$oid_str");
    }
    tpl_set('comments', $comments);
}

$is_note = false;
$is_group = false; 
$obj_name = "";
$is_obj_admin = null;
if ($subj && is_tuna_obj($subj)) {
  if(notebook_is_note($subj)) {
    $is_note = true;
    $obj_name = notebook_get_title($subj);
  } elseif (obj_is_group($subj)){
    $is_group = true;
    $obj_name = obj_get_name($subj);
  } else {
    $obj_name = obj_get_name($subj);
  }

  if($user) 
    $is_obj_admin = obj_is_admin($subj, $user);
}

tpl_set('is_note',      $is_note);
tpl_set('is_group',     $is_group);
tpl_set('share_hrefs',  $share_hrefs);
tpl_set('show_save_button', !$is_unregistered);
tpl_set('pid',          $pid);
tpl_set('id',           $id);
tpl_set('aid',          $aid);
tpl_set('oid',          (is_tuna_obj($subj) ? $subj : 0));
if($is_note) {
  tpl_set('obj_name',     $obj_name);
} else {
  txt_set('obj_name',     $obj_name);
}
txt_set('profile_name', $profile['name']);
txt_set('profile_id', $profile['id']);

txt_set('owner_name',   get_short_profile_attr($id, 'name')); // different than profile_name if $subj is another user
tpl_set('user',         $user);
txt_set('view',         $get_view);
txt_set('oview',        $get_oview);
tpl_set('opage',        $opage);
tpl_set('created', $photo_template['created']);
tpl_set('subj',         $subj);
txt_set('name',         $get_name);
tpl_set('from_search',  $from_search);
tpl_set('changes_saved',$get_saved);
tpl_set('is_obj_admin', $is_obj_admin);
tpl_set('psid',         $psid);

$ratings_enabled = false;
if (is_tuna_obj($subj) && obj_is_sponsored($subj)) {
  $photo_contest_enabled = get_site_variable('SGROUP_RATINGS_PHOTOS_ENABLED');
  if ($photo_contest_enabled && ratings_contest_is_active($subj, CONTEST_TYPE_PHOTO)) {
    $ratings_enabled = true;
  }
}
tpl_set('ratings_enabled', $ratings_enabled);

$network_name = network_get_name(id_get_primary_network($photo_template['user']));
txt_set('network_name', $network_name);

// $user can be < 0 in AIM mode, just use 0 there
$falcon_id = ($user > 0) ? $user : 0;
falcon_log('view_photo', $falcon_id, true, array($photo_template['user'], id_get_primary_network($photo_template['user']), $pid));

tpl_set('WALL_POST_MAX_LENGTH', $GLOBALS['WALL_POST_MAX_LENGTH']);

// render
render_template($_SERVER['PHP_ROOT'].'/html/photo.phpt');
