const express = require('express');
const ejs = require('ejs');
const TfIdf = require('tf-idf-search');
const fs = require("fs");
const path=require("path");
const tf_idf = new TfIdf();
const app=express();

app.use(express.json());

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"/public")));

const PORT = process.env.PORT || 3000;

    // tfidf data fetching
    var corpus;
    var similarity = [];
    var sentence = "";
    for (var i = 1; i <= 990; i++) 
    {
        var str = "data/problem_extract/problem_extract" + i + ".txt";
        sentence = fs.readFileSync(str, "utf8");
        var newstr = "";
        newstr = sentence.replaceAll(',', ' ');
        corpus = tf_idf.addDocumentFromString(newstr);
    }

    var str1 = "data/codechef_practice_problem_url.txt";
    var url = fs.readFileSync(str1).toString().split("\n");


    var str2 = "data/codechef_practice_problem_titles.txt";
    var title = fs.readFileSync(str2).toString().split("\n");

app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/search",(req,res)=>{
    const query = req.query;
    const quest=query.question;
    var input = quest;
    
    // tfidf similarity calculating
    for (var i = 0; i < 500; i++) //3429
    {
        similarity[i] = tf_idf.calculateSimilarityIndex(input, tf_idf.corpus[i]);
    }

    var index1= -1 ,index2= -1 ,index3= -1 ,index4= -1,index5=-1;
    // index1
    var temp=0;
    for (var i = 0; i < 500; i++)
    {
        if(similarity[i]>temp)
        {
                temp=similarity[i];
                index1=i;
        }
    }

    // index2
    temp=0;
    for (var i = 0; i < 500; i++)
    {
        if (i!=index1)
        {
                if(similarity[i]>temp)
                {
                        temp=similarity[i];
                        index2=i;
                }
        }
    }

    // index3
    temp=0;
    for (var i = 0; i < 500; i++)
    {
        if (i!=index1 && i!=index2)
        {
                if(similarity[i]>temp)
                {
                        temp=similarity[i];
                        index3=i;
                }
        }
    }

    // index4
    temp=0;
    for (var i = 0; i < 500; i++)
    {
        if (i!=index1 && i!=index2 && i!=index3)
        {
                if(similarity[i]>temp)
                {
                        temp=similarity[i];
                        index4=i;
                }
        }
    }

    // index5
    temp=0;
    for (var i = 0; i < 500; i++)
    {
        if (i!=index1 && i!=index2 && i!=index3 && i!=index4)
        {
                if(similarity[i]>temp)
                {
                        temp=similarity[i];
                        index5=i;
                }
        }
    }

    //list of 5 qstn

    if(index1 != -1 && index2!= -1 && index3 != -1 && index4 !=-1 && index5!=-1)
    {
        index1+=1;
        index2+=1;
        index3+=1;
        index4+=1;
        index5+=1;
        var btr1 = "data/codechef_practice_problem/codechef_practice_problem_"+index1+".txt";
        var body1 = fs.readFileSync(btr1, "utf8");
        var btr2 = "data/codechef_practice_problem/codechef_practice_problem_"+index2+".txt";
        var body2 = fs.readFileSync(btr2, "utf8");
        var btr3 = "data/codechef_practice_problem/codechef_practice_problem_"+index3+".txt";
        var body3 = fs.readFileSync(btr3, "utf8");
        var btr4 = "data/codechef_practice_problem/codechef_practice_problem_"+index4+".txt";
        var body4 = fs.readFileSync(btr4, "utf8");
        var btr5 = "data/codechef_practice_problem/codechef_practice_problem_"+index5+".txt";
        var body5 = fs.readFileSync(btr5, "utf8");
        var  arr=[
        {
            title: title[index1-1],
            url: url[index1-1],
            body: body1
        },
        {
            title: title[index2-1],
            url: url[index2-1],
            body: body2
        },
        {
            title: title[index3-1],
            url: url[index3-1],
            body: body3
        },
        {
            title: title[index4-1],
            url: url[index4-1],
            body: body4
        },
        {
            title: title[index5-1],
            url: url[index5-1],
            body: body5
        }
        ];
        res.json(arr);
    }
    else if(index1 != -1 && index2!= -1 && index3 != -1 && index4 !=-1)
    {
        index1+=1;
        index2+=1;
        index3+=1;
        index4+=1;
        var btr1 = "data/codechef_practice_problem/codechef_practice_problem_"+index1+".txt";
        var body1 = fs.readFileSync(btr1, "utf8");
        var btr2 = "data/codechef_practice_problem/codechef_practice_problem_"+index2+".txt";
        var body2 = fs.readFileSync(btr2, "utf8");
        var btr3 = "data/codechef_practice_problem/codechef_practice_problem_"+index3+".txt";
        var body3 = fs.readFileSync(btr3, "utf8");
        var btr4 = "data/codechef_practice_problem/codechef_practice_problem_"+index4+".txt";
        var body4 = fs.readFileSync(btr4, "utf8");
        var arr=[
                {
                    title: title[index1-1],
                    url: url[index1-1],
                    body: body1
                },
                {
                    title: title[index2-1],
                    url: url[index2-1],
                    body: body2
                },
                {
                    title: title[index3-1],
                    url: url[index3-1],
                    body: body3
                },
                {
                    title: title[index4-1],
                    url: url[index4-1],
                    body: body4
                },
                {
                    title: "",
                    url: "",
                    body: ""
                }
            ];
            res.json(arr);
    }
    else if(index1 != -1 && index2!= -1 && index3 != -1)
    {
        index1+=1;
        index2+=1;
        index3+=1;
        var btr1 = "data/codechef_practice_problem/codechef_practice_problem_"+index1+".txt";
        var body1 = fs.readFileSync(btr1, "utf8");
        var btr2 = "data/codechef_practice_problem/codechef_practice_problem_"+index2+".txt";
        var body2 = fs.readFileSync(btr2, "utf8");
        var btr3 = "data/codechef_practice_problem/codechef_practice_problem_"+index3+".txt";
        var body3 = fs.readFileSync(btr3, "utf8");
        var arr=[
                {
                    title: title[index1-1],
                    url: url[index1-1],
                    body: body1
                },
                {
                    title: title[index2-1],
                    url: url[index2-1],
                    body: body2
                },
                {
                    title: title[index3-1],
                    url: url[index3-1],
                    body: body3
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                }
            ];
            res.json(arr);
    }
    else if(index1 != -1 && index2!= -1)
    {
        index1+=1;
        index2+=1;
        var btr1 = "data/codechef_practice_problem/codechef_practice_problem_"+index1+".txt";
        var body1 = fs.readFileSync(btr1, "utf8");
        var btr2 = "data/codechef_practice_problem/codechef_practice_problem_"+index2+".txt";
        var body2 = fs.readFileSync(btr2, "utf8");
        var arr=[
                {
                    title: title[index1-1],
                    url: url[index1-1],
                    body: body1
                },
                {
                    title: title[index2-1],
                    url: url[index2-1],
                    body: body2
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                }
            ];
            res.json(arr);
    }
    else if(index1 != -1)
    {
        index1+=1;
        var btr1 = "data/codechef_practice_problem/codechef_practice_problem_"+index1+".txt";
        var body1 = fs.readFileSync(btr1, "utf8");
        var arr=[
                {
                    title: title[index1-1],
                    url: url[index1-1],
                    body: body1
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                }
            ];
            res.json(arr);
    }
    else
    {
        var arr=[
                {
                    title: "",
                    url: "",
                    body: "Query not found in the database"
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                },
                {
                    title: "",
                    url: "",
                    body: ""
                }
            ];
            res.json(arr);
    }
});
app.listen(PORT, ()=>{
    console.log("server is running on port "+PORT);
});

