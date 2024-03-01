import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class CareyIAMStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        //  EC2 policy
        const EC2LambdaPPolicy = new iam.PolicyDocument( {
                statements: [
                    new iam.PolicyStatement({
                        effect: iam.Effect.ALLOW,
                        actions: [
                            "ec2:CreateNetworkInterface",
                            "ec2:DescribeNetworkInterfaces",
                            "ec2:DescribeSecurityGroups",
                            "ec2:DescribeSubnets",
                            "ec2:DescribeVpcs"
                        ],
                        resources:[ "*"]
                    })
                ]
            }
        )

        // Pass policy
        const PassLambdaPolicy = new iam.PolicyDocument( {
                statements: [
                    new iam.PolicyStatement({
                        effect: iam.Effect.ALLOW,
                        actions: ["iam:PassRole"],
                        resources:["*"]
                    })
                ]
            }
        )

        // MetricsClient Role
        const CareyMetricsClientLambdaRole = new iam.Role(this, `careylambda-role`, {
                roleName: `careylambda-role`,
                assumedBy: new iam.CompositePrincipal(
                    new iam.ServicePrincipal('lambda.amazonaws.com'),
                    new iam.ServicePrincipal( 'events.amazonaws.com')
                ),
                inlinePolicies: {
                    EC2LambdaPPolicy: EC2LambdaPPolicy,
                    PassLambdaPolicy: PassLambdaPolicy
                },
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchEventsFullAccess'),
                    iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSFullAccess'),
                    iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'),
                ]
            }
        )
    }
}