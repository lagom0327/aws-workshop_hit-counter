"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const hitcounter_1 = require("../lib/hitcounter");
test('DynamoDB Table Created', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'lambda.handler',
            code: lambda.Code.fromInline('test')
        })
    });
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::DynamoDB::Table", {
        SSESpecification: {
            SSEEnabled: true
        }
    }));
});
test('Lambda Has Environment Variables', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'lambda.handler',
            code: lambda.Code.inline('test')
        })
    });
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function", {
        Environment: {
            Variables: {
                DOWNSTREAM_FUNCTION_NAME: {
                    "Ref": "TestFunction22AD90FC"
                },
                HITS_TABLE_NAME: {
                    "Ref": "MyTestConstructHits24A357F0"
                }
            }
        }
    }));
});
test('read capacity can be configured', () => {
    const stack = new cdk.Stack();
    expect(() => {
        new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
            downstream: new lambda.Function(stack, 'TestFunction', {
                runtime: lambda.Runtime.NODEJS_10_X,
                handler: 'lambda.handler',
                code: lambda.Code.inline('test')
            }),
            readCapacity: 3
        });
    }).toThrowError(/readCapacity must be greater than 5 and lower than 20/);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGl0Y291bnRlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQW9FO0FBQ3BFLHFDQUFzQztBQUN0Qyw4Q0FBOEM7QUFFOUMsa0RBQWdEO0FBRWhELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsT0FBTztJQUNQLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsVUFBVSxFQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ3JDLENBQUM7S0FDSCxDQUFDLENBQUM7SUFDSCxPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLHNCQUFzQixFQUFFO1FBQ3ZELGdCQUFnQixFQUFFO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsT0FBTztJQUNQLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsVUFBVSxFQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pDLENBQUM7S0FDSCxDQUFDLENBQUM7SUFDSCxPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLHVCQUF1QixFQUFFO1FBQ3hELFdBQVcsRUFBRTtZQUNYLFNBQVMsRUFBRTtnQkFDVCx3QkFBd0IsRUFBRTtvQkFDaEIsS0FBSyxFQUFFLHNCQUFzQjtpQkFDOUI7Z0JBQ1QsZUFBZSxFQUFFO29CQUNQLEtBQUssRUFBRSw2QkFBNkI7aUJBQ3JDO2FBQ1Y7U0FDRjtLQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRTlCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixJQUFJLHVCQUFVLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1lBQ3ZDLFVBQVUsRUFBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtnQkFDdEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFDbkMsT0FBTyxFQUFFLGdCQUFnQjtnQkFDekIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNqQyxDQUFDO1lBQ0YsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgYXMgZXhwZWN0Q0RLLCBoYXZlUmVzb3VyY2UgfSBmcm9tICdAYXdzLWNkay9hc3NlcnQnO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcblxuaW1wb3J0IHsgSGl0Q291bnRlciB9ICBmcm9tICcuLi9saWIvaGl0Y291bnRlcic7XG5cbnRlc3QoJ0R5bmFtb0RCIFRhYmxlIENyZWF0ZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuICAvLyBXSEVOXG4gIG5ldyBIaXRDb3VudGVyKHN0YWNrLCAnTXlUZXN0Q29uc3RydWN0Jywge1xuICAgIGRvd25zdHJlYW06ICBuZXcgbGFtYmRhLkZ1bmN0aW9uKHN0YWNrLCAnVGVzdEZ1bmN0aW9uJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICBoYW5kbGVyOiAnbGFtYmRhLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZSgndGVzdCcpXG4gICAgfSlcbiAgfSk7XG4gIC8vIFRIRU5cbiAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OkR5bmFtb0RCOjpUYWJsZVwiLCB7XG4gICAgU1NFU3BlY2lmaWNhdGlvbjoge1xuICAgICAgU1NFRW5hYmxlZDogdHJ1ZVxuICAgIH1cbiAgfSkpO1xufSk7XG5cbnRlc3QoJ0xhbWJkYSBIYXMgRW52aXJvbm1lbnQgVmFyaWFibGVzJywgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgLy8gV0hFTlxuICBuZXcgSGl0Q291bnRlcihzdGFjaywgJ015VGVzdENvbnN0cnVjdCcsIHtcbiAgICBkb3duc3RyZWFtOiAgbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgJ1Rlc3RGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgaGFuZGxlcjogJ2xhbWJkYS5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmlubGluZSgndGVzdCcpXG4gICAgfSlcbiAgfSk7XG4gIC8vIFRIRU5cbiAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OkxhbWJkYTo6RnVuY3Rpb25cIiwge1xuICAgIEVudmlyb25tZW50OiB7XG4gICAgICBWYXJpYWJsZXM6IHtcbiAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiB7XG4gICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIlRlc3RGdW5jdGlvbjIyQUQ5MEZDXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICBISVRTX1RBQkxFX05BTUU6IHtcbiAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiTXlUZXN0Q29uc3RydWN0SGl0czI0QTM1N0YwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KSk7XG59KVxuXG50ZXN0KCdyZWFkIGNhcGFjaXR5IGNhbiBiZSBjb25maWd1cmVkJywgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcblxuICBleHBlY3QoKCkgPT4ge1xuICAgIG5ldyBIaXRDb3VudGVyKHN0YWNrLCAnTXlUZXN0Q29uc3RydWN0Jywge1xuICAgICAgZG93bnN0cmVhbTogIG5ldyBsYW1iZGEuRnVuY3Rpb24oc3RhY2ssICdUZXN0RnVuY3Rpb24nLCB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgICBoYW5kbGVyOiAnbGFtYmRhLmhhbmRsZXInLFxuICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5pbmxpbmUoJ3Rlc3QnKVxuICAgICAgfSksXG4gICAgICByZWFkQ2FwYWNpdHk6IDNcbiAgICB9KTtcbiAgfSkudG9UaHJvd0Vycm9yKC9yZWFkQ2FwYWNpdHkgbXVzdCBiZSBncmVhdGVyIHRoYW4gNSBhbmQgbG93ZXIgdGhhbiAyMC8pO1xufSk7XG4iXX0=