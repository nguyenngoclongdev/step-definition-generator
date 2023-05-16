Feature: Some terse yet descriptive text of what is desired
    In order to realize a named business value
    As an explicit system actor
    I want to gain some beneficial outcome which furthers the goal

    Scenario: Eat 5 out of 12
        Given there are 12 cucumbers
        When I eat 5 cucumbers
        Then I should have 7 cucumbers

    Scenario: Wilson posts to his own blog
        Given I am logged in as Wilson
        When I try to post to "Expensive Therapy"
        Then I should see "Your article was published."

    Scenario: Wilson fails to post to somebody else's blog
        Given I am logged in as Wilson
        When I try to post to "Greg's anti-tax rants"
        Then I should see "Hey! That's not your blog!"

    Scenario Outline: Eating
        Given there are <start> cucumbers
        When I eat <eat> cucumbers
        Then I should have <left> cucumbers

        Examples:
            | start | eat | left |
            | 12    | 5   | 7    |
            | 20    | 5   | 15   |