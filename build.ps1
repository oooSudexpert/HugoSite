#!/bin/bash

hugo build --config .\hugo-prod-tlt.yml --environment production --cleanDestinationDir --minify
hugo build --config .\hugo-prod-smr.yml --environment production --cleanDestinationDir --minify
hugo build --config .\hugo-prod-msk.yml --environment production --cleanDestinationDir --minify