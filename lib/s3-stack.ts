import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class CareyS3Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an S3 bucket
        new s3.Bucket(this, 'CareyS3Bucket', {
            versioned: true,
            publicReadAccess: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
    }
}

