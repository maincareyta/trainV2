#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CareyS3Stack } from '../lib/s3-stack';
import { CareyIAMStack } from '../lib/iam_stack'

const app = new cdk.App();
new CareyS3Stack(app, 'CareyS3Stack');
new CareyIAMStack(app,"CareyIamStack")
