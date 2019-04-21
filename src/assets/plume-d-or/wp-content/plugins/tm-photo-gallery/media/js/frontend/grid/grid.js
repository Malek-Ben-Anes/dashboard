Registry.register("grid",(function($){"use strict";var state,prefix='.tm-pg_frontend';function __$(value){return $(__s(value));}
function __s(value){if(_.isUndefined(state.ID)){return prefix+' '+value;}else{return prefix+'[data-id="'+state.ID+'"] '+value;}}
function __(value){return Registry._get(value);}
function _onClick(selector,callback){$(document).off('click',__s(selector)).on('click',__s(selector),function(e){e.preventDefault();if(!_.isUndefined(callback)&&_.isFunction(callback)){callback(this,e);}});}
function createInstance(){return{body:$('html, body'),wpadminbar:$('#wpadminbar'),ID:0,_item:'.tm_pg_gallery-item',_item_wrapper:'.tm_pg_gallery-item-wrapper',_preloader:'.tm-pg_front_gallery-preloader',_load:{grid:'.tm_pg_gallery-item_show-more',btn:'.load-more-button'},_content:{gallery:'.tm-pg_front_gallery',grid:'.tm-pg_front_gallery-grid .row',masonry:'.tm-pg_front_gallery-masonry',justify:'.tm-pg_front_gallery-justify'},_pagination:{content:'.tm-pg_front_gallery-navigation',numbers:'.tm-pg_front_gallery-navigation nav'},_filter:{line:{item:'.tm-pg_front_gallery-tabs li a',content:'.tm-pg_front_gallery-tabs'},dropdown:{item:'.filter-select__list li a',content:'.filter-select'}},_input:{term_id:'input[name="term_id"]',term_type:'input[name="term_type"]',offset:'input[name="offset"]',per_page:'input[name="images_per_page"]',count:'input[name="all_count"]'},getID:function($this){return $this.parents(prefix).data('id');},clickPagination:function(page,$parent,callback){var $offset=$parent.siblings(state._input.offset),$images_per_page=$parent.siblings(state._input.per_page);$parent.find('a').removeClass('current');page--;$offset.val(parseInt($images_per_page.val(),10)*page);state.ID=state.getID($parent);state.loadMore('replase',function(){if(page>0){$parent.find('a.prev').show();}else{$parent.find('a.prev').hide();}
page++;if(page<$parent.find('nav').data('count')){$parent.find('a.next').show();}else{$parent.find('a.next').hide();}
if(!_.isUndefined(callback)&&_.isFunction(callback)){callback();}});},init:function(id){var view,gallery;state.ID=id;state.checkLoadMore();state.initEvents();__('slider').init(id);view=$(prefix+'[data-id="'+state.ID+'"]').data('view');gallery=__$(state._content[view]);gallery.imagesLoaded(function(){if('grid'===view){state.setLoadMoreGirdHeight();$(window).resize(function(){state.gridBtnHeight=0;state.setLoadMoreGirdHeight();});}
if('masonry'===view){gallery.masonry({itemSelector:state._item,});}
if('justify'===view){state.justifiedLayoutRender();}});},initEvents:function(){var container=prefix+'[data-id="'+state.ID+'"]';$(container).on('click',state._load.grid+' a',state.onClickLoadMore.bind(this));$(container).on('click',state._load.btn+' a',state.onClickLoadMoreBtn.bind(this));$(container).on('click',state._pagination.content+' a',state.onClickPagination.bind(this));$(container).on('click',state._filter.dropdown.item,state.onClickFilterItem.bind(this));$(container).on('click',state._filter.line.item,state.onClickFilterItem.bind(this));},onLoadGrid:function(e){console.log(e);},onClickFilterItem:function(e){e.preventDefault();state.sortGrid($(e.currentTarget));},onClickPagination:function(e){e.preventDefault();var $this=$(e.currentTarget),$parent=$this.parents(state._pagination.content);if($this.hasClass('current')){return false;}
if($this.hasClass('next')){var page=$parent.find('a.current').text();state.clickPagination(++page,$parent,function(){$parent.find('a[data-pos="'+page+'"]').addClass('current');});}else if($this.hasClass('prev')){var page=$parent.find('a.current').text();state.clickPagination(--page,$parent,function(){$parent.find('a[data-pos="'+page+'"]').addClass('current');});}else{state.clickPagination($this.text(),$parent,function(){$this.addClass('current');});}},onClickLoadMore:function(e){e.preventDefault();state.ID=state.getID($(e.currentTarget));state.loadMore('append');},onClickLoadMoreBtn:function(e){e.preventDefault();state.ID=state.getID($(e.currentTarget));state.loadMore('append');},updateURLParameter:function(param,paramVal){if(history.pushState){var newurl=window.location.protocol+"//"+window.location.host+window.location.pathname+'?'+param+'='+paramVal;window.history.pushState({path:newurl},'',newurl);}},loadMore:function(type,callback){if(_.isUndefined(type)){type='append';}
var $offset=__$(state._input.offset),$images_per_page=__$(state._input.per_page),$term_id=__$(state._input.term_id),$term_type=__$(state._input.term_type),view=$(prefix+'[data-id="'+state.ID+'"]').data('view'),gallery=__$(state._content[view]),preloader=__$(state._preloader),topOffset,wpadminbarHeight,loadMoreGrid=__$(state._load.grid),newItems=[];if(_.isEqual(type,'append')){loadMoreGrid.addClass('tm_pg_loading');loadMoreGrid.find('.preloader').show();if(!$offset.val()){$offset.val(Number($offset.val())+Number($images_per_page.val()));}}
if(_.isEqual(type,'replase')){gallery.css('height',gallery.height());wpadminbarHeight=state.wpadminbar.length>0?state.wpadminbar.height():0;topOffset=__$(state._content.gallery).offset().top-wpadminbarHeight;state.body.stop().animate({scrollTop:topOffset},350);if(loadMoreGrid.length){loadMoreGrid.fadeTo(350,0,function(){loadMoreGrid.remove();});}
state.hideAnimation(state._content[view]+' '+state._item_wrapper,50);preloader.removeClass('tm-pg_hidden');}
state.getContent($offset.val(),$images_per_page.val(),$term_id.val(),$term_type.val(),function($html){if(_.isEqual(type,'append')){loadMoreGrid.fadeTo(350,0,function(){loadMoreGrid.remove();});}
if(_.isEqual(type,'replase')){__$(state._content[view]).html('');}
$.each($html,function(key,value){var $value=$(value);$value.find(state._item_wrapper).addClass('animate-cycle-show');__$(state._content[view]).append($value);newItems.push($value);});if('masonry'!==view){setTimeout(function(){gallery.css('height','');},100);}
preloader.addClass('tm-pg_hidden');state.checkLoadMore(newItems.length*50);__('slider').init(state.ID);if(__$(state._pagination.content).length){var $current=__$('a.current',state._pagination.numbers).last().next();$current.addClass('current');__$('a.next',state._pagination.numbers).hide();__$('a.prev',state._pagination.numbers).hide();}
if(!_.isUndefined(callback)&&_.isFunction(callback)){callback();}
gallery.imagesLoaded(function(){if('masonry'===view){gallery.masonry('reloadItems');setTimeout(function(){gallery.masonry();},400);setTimeout(function(){state.showAnimation(newItems,50);},500);}
if('justify'===view){state.justifiedLayoutRender();}
if('masonry'!==view){state.showAnimation(newItems,50);}});});},checkLoadMore:function(timeout){var view=$(prefix+'[data-id="'+state.ID+'"]').data('view'),$offset=__$(state._input.offset),$images_per_page=__$(state._input.per_page),timeout=timeout?timeout+350:0,$term_id=__$(state._input.term_id),total_count=Number(__$('a[data-id="'+$term_id.val()+'"]').data('count'));total_count=_.isNaN(total_count)?__$(state._input.count).val():total_count;$offset.val(parseInt($offset.val(),10)+parseInt($images_per_page.val(),10));if(parseInt($offset.val(),10)>=parseInt(total_count,10)){__$(state._load.btn).hide(350);__$(state._load.grid).hide(350);}else{if('grid'===view){state.setLoadMoreGirdHeight();}
__$(state._load.btn).fadeTo(500,1);__$(state._load.grid).delay(timeout).fadeTo(500,1);}},setLoadMoreGirdHeight:function(){var loadMoreGrid=__$(state._load.grid);if(loadMoreGrid.length){if(!state.gridBtnHeight){state.gridBtnHeight=__$(state._item).first().height();}
loadMoreGrid.height(state.gridBtnHeight);}},sortGrid:function($this){state.ID=state.getID($this);var term_id=$this.attr('data-id'),type=$this.attr('data-type'),view=$(prefix+'[data-id="'+state.ID+'"]').data('view'),gallery=__$(state._content[view]),preloader=__$(state._preloader),newItems=[],loadMoreGrid=__$(state._load.grid);state.hideAnimation(state._content[view]+' '+state._item_wrapper,50);if(loadMoreGrid.length){var itemsCount=gallery.find('.tm_pg_gallery-item').length-1;loadMoreGrid.delay((itemsCount*50)+100).fadeTo(350,0,function(){loadMoreGrid.remove();});}
preloader.removeClass('tm-pg_hidden');__$(state._filter.dropdown.content).removeClass('open');__$(state._filter.dropdown.content).find('li').removeClass('active');state.filterContent(term_id,type,function($data){__$(state._filter.line.content).find('li').removeClass('active');$this.parents('li').addClass('active');__$(state._content[view]).html('');$.each($data,function(key,value){var $value=$(value);$value.find(state._item_wrapper).addClass('animate-cycle-show');__$(state._content[view]).append($value);newItems.push($value);});preloader.addClass('tm-pg_hidden');__$(state._input.term_id).val(term_id);__$(state._input.term_type).val(type);__$(state._input.offset).val(0);if(__$(state._pagination.content).data('load-more-page')){state.getPagination(term_id,type,function(html){__$(state._pagination.content).html(html);state.checkLoadMore(newItems.length*50);__('slider').init(state.ID);});}else{state.checkLoadMore(newItems.length*50);__('slider').init(state.ID);}
gallery.imagesLoaded(function(){if('masonry'===view){gallery.masonry('reloadItems');gallery.masonry();}
if('justify'===view){state.justifiedLayoutRender();}
state.showAnimation(newItems,50);});});},filterContent:function(term_id,type,callback){var $params={action:'tm_pg_f',post_id:__$('').data('post-id'),fields:'all'},$images_per_page=__$(state._input.per_page);$params[window.tm_pg_options.action]='filter_grid';$params.controller='grid';$params.term_id=term_id;$params.id=state.ID;$params.type=type;$params.images_per_page=$images_per_page.val();$params.tm_pg_nonce=window.tm_pg_options.nonce;$.post(window.tm_pg_options.ajax_url,$params,function(data){if(!_.isUndefined(callback)&&_.isFunction(callback)){callback(data.data);}});},getContent:function(offset,images_per_page,term_id,type,callback){var $params={action:'tm_pg_f',controller:'grid',shortcode:'grid',fields:'all',post_id:__$('').data('post-id'),term_id:term_id,type:type,id:state.ID,offset:offset,images_per_page:images_per_page};$params.tm_pg_nonce=window.tm_pg_options.nonce;$params[window.tm_pg_options.action]='get_content';$.post(window.tm_pg_options.ajax_url,$params,function(data){if(data.success&&!_.isUndefined(callback)&&_.isFunction(callback)){callback(data.data);}});},getPagination:function(term_id,type,callback){var $params={action:'tm_pg_f'};$params[window.tm_pg_options.action]='get_pagination';$params.controller='grid';$params.id=state.ID;$params.term_id=term_id;$params.type=type;$params.tm_pg_nonce=window.tm_pg_options.nonce;$.post(window.tm_pg_options.ajax_url,$params,function(data){if(data.success&&!_.isUndefined(callback)&&_.isFunction(callback)){callback(data.data);}});},showAnimation:function(items,delta){items.forEach(function(item,i){var delay=delta*i+350,timeOutInterval;timeOutInterval=setTimeout(function(){item.find(state._item_wrapper).removeClass('animate-cycle-show');},delay);});},hideAnimation:function(selector,delta){__$(selector).each(function(index,el){var $this=$(el),delay=delta*(index+1),timeOutInterval;timeOutInterval=setTimeout(function(){$this.addClass('animate-cycle-hide');},delay);});},justifiedLayoutRender:function(){var projectsListWrap=$(state._content.justify),projectsList=$(state._item,projectsListWrap),moreGridBtn=$(state._load.grid,projectsListWrap),fixedHeight=projectsListWrap.data('fixed-height');if(moreGridBtn.length){moreGridBtn.css({'min-height':fixedHeight});moreGridBtn.find('.tm_pg_gallery-item_link_show-more').css({'min-height':fixedHeight});}
projectsList.each(function(){var $this=$(this),imageWidth=$this.data('image-width'),imageHeight=$this.data('image-height'),imageRatio=+imageWidth/+imageHeight,flexValue=Math.round(imageRatio*100),newWidth=Math.round(fixedHeight*imageRatio),newHeight='auto';$this.css({'flex-grow':flexValue,'flex-basis':newWidth,'max-width':imageWidth});});}};}
return{getInstance:function(){if(!state){state=createInstance();}
return state;}};})(jQuery));