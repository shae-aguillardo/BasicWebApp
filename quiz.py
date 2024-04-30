from math import floor
print("Welcome to my computer quiz!")
playing = input("Do you want to play?(yes/no) ")

if(playing.lower() != "yes"):
    print("Good bye :(")
    quit()
print("Okay let's play :)")
score = 0;

questions = {
    "What does BBC stand for? ":"british broadcasting corporation",
    "What year did World War II end? ":"1945",
    "How many makes up a baker's dozen? ":"12"
}

messages = {
    0:"Keep practicing 😉",
    50:"Great Job 😁",
    90:"AMAZING 😎",
}

# for question,values in questions.items(): another loop way
for question in questions:
    answer = input(question).lower()
    if(answer == questions[question]):
        score+=1
        print("CORRECT")
    else:
        print("INCORRECT")

success_percentage = score/len(questions.keys())*100

for message,value in messages.items():
    if (floor(success_percentage)>=message):
        msg = value

print("="*30)
print(f"You got {score} questions correct")
print(f"You got {round(success_percentage,2)}%")    
print(msg)
print("="*30)
