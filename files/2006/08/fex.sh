#!/bin/bash
FIREFOX_FEEDS="https://addons.mozilla.org/rss/firefox/extensions/newest/ https://addons.mozilla.org/rss/firefox/extensions/updated/ https://addons.mozilla.org/rss/firefox/extensions/popular/"
for FEED in $FIREFOX_FEEDS
do
	CONTENT=`wget -O- -q $FEED`
	echo $CONTENT | grep -Eo '<link>([^<]+)</link>' | sed -r 's/<\/?link>//g' | grep -vE '^https://addons.mozilla.org$'
done | while read LINK
do
	CONTENT=`wget -O- -q $LINK`
	echo $CONTENT | grep -Eo 'href="[^"]+"' | grep -E '\.xpi"$' | cut -d'"' -f2- | cut -d '"' -f1
done | while read XPI_LINK
do
	XPI_DIR=`mktemp -d`
	XPI_NAME=`echo $XPI_LINK | sed -r 's/.+\///g'`
	XPI_CONTENT="$XPI_DIR/content"

	echo "-- getting $XPI_NAME"
	wget -O $XPI_DIR/content.zip -q $XPI_LINK
	mkdir $XPI_CONTENT

	echo "-- extracting content"
	unzip $XPI_DIR/content.zip -d $XPI_CONTENT > /dev/null

	echo "-- search for chrome images"
	find $XPI_CONTENT -name '*.jar' | while read ZIP
	do
		ZIP_CONTENT=`echo $ZIP | sed -r -e 's/\.[^.]+$//g'`
		mkdir $ZIP_CONTENT
		unzip $ZIP -d $ZIP_CONTENT > /dev/null
	done
	find $XPI_CONTENT | grep -E '\.(png|jpg|gif|bmp)$' | grep -E 'chrome\/.*?\/skin\/classic' | while read IMAGE
	do
		SIGNATURE=`echo $IMAGE | sed -r -e 's/.*\/chrome\///g'`
		IMAGE_FILE=`echo $SIGNATURE | sed -r -e 's/.*\///g'`
		EXTENSION_NAME=`echo $SIGNATURE | sed -r -e 's/\/.*//'`
		echo "$XPI_NAME,chrome://$EXTENSION_NAME/skin/$IMAGE_FILE"
	done

	rm -rf $XPI_DIR
done
